import React, { useState } from "react";
import styles from "./GraduationPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import PlanBottom from "./Components/GraduationPage/PlanBottom";
import PlanTop from "./Components/GraduationPage/PlanTop";
import Todo from "./Components/GraduationPage/Todo";
import NewTodo from "./Components/GraduationPage/NewTodo";
import { BsPlusCircle, BsPencilSquare } from "react-icons/bs";
import SelectBox from "./Components/GraduationPage/SelectBox";

// import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const GraduationPage = () => {
  const [todo, setTodo] = useState([
    { id: Date.now(), value: "토익 900점 이상", completed: false },
    {
      id: Date.now() + 1,
      value: "졸업 프로젝트",
      completed: false,
    },
  ]); // todo 데이터 (임시 데이터 2개)

  const [addTodo, setAddTodo] = useState(false); // todo 추가 처리를 위한 state
  const [editYearE, setEditE] = useState(false); // 입학년도 수정을 위한 state
  const [editYearG, setEditG] = useState(false); // 졸업년도 수정을 위한 state
  const [enter, setEnter] = useState(2016); // 입학년도
  const [graduate, setGraduate] = useState(2022); // 졸업년도
  const [graduateM, setGraduateM] = useState(2); // 졸업년도

  /* --------------- todo 완료 처리 --------------- */
  const completeTodo = (id) => {
    let newTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodo(newTodo);
  };

  /* --------------- todo 삭제 처리 --------------- */
  const deleteTodo = (id) => {
    let newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <IndexBar />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>
            <div className={styles.contentTop}>
              <div className={styles.div1}>
                <div className={styles.line1}>
                  <div className={styles.circle}>입학 년도</div>
                  <div className={styles.textBox}>
                    {editYearE ? (
                      <SelectBox
                        title="입학년도"
                        year={enter}
                        setYear={setEnter}
                        reset={setEditE}
                      />
                    ) : (
                      <>
                        <span className={styles.date}>{enter}년</span>
                        <button
                          className={styles.editBtn}
                          onClick={() => setEditE(true)}
                        >
                          <BsPencilSquare className={styles.icon} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.line2}>
                  <div className={styles.circle}>졸업 년도</div>
                  <div className={styles.textBox}>
                    {editYearG ? (
                      <SelectBox
                        title="졸업년도"
                        year={graduate}
                        setYear={setGraduate}
                        month={graduateM}
                        setMonth={setGraduateM}
                        reset={setEditG}
                      />
                    ) : (
                      <>
                        <span className={styles.date}>
                          {graduate}년 {graduateM}월
                        </span>
                        <button
                          className={styles.editBtn}
                          onClick={() => setEditG(true)}
                        >
                          <BsPencilSquare className={styles.icon} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.div2}>
                <div className={styles.left}>
                  <div className={styles.circle}>졸업 요건</div>
                </div>
                <div className={styles.todoContainer}>
                  <div>
                    {todo.map((todo) => {
                      return (
                        <Todo
                          todo={todo}
                          completeTodo={completeTodo}
                          deleteTodo={deleteTodo}
                        />
                      );
                    })}
                    {addTodo ? (
                      <NewTodo
                        todo={todo}
                        setTodo={setTodo}
                        setAddTodo={setAddTodo}
                      />
                    ) : undefined}
                    <button
                      className={styles.addBtn}
                      onClick={() => setAddTodo(true)}
                    >
                      <BsPlusCircle style={{ height: "20px", width: "20px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contentBottom}>
              <Swiper slidesPerView={4}>
                <SwiperSlide key={1}>
                  <PlanTop />
                </SwiperSlide>
                <SwiperSlide key={2}>
                  <PlanBottom />
                </SwiperSlide>
                <SwiperSlide key={3}>
                  <PlanTop />
                </SwiperSlide>
                <SwiperSlide key={4}>
                  <PlanBottom />
                </SwiperSlide>
                <SwiperSlide key={5}>
                  <PlanTop />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationPage;
