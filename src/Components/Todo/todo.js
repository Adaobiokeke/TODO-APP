import { useState } from "react";
import DarkBG from "../../Assets/bg-desktop-dark.jpg";
import LightBG from "../../Assets/bg-desktop-light.jpg";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   moonIcon: {
    cursor: "pointer",
   },

  updatediv: {
    // border:'1px solid #5f5d5d',
    width: 500,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    bottom: 100,
    margin: "auto",
    backgroundColor: "transparent",
  },
  updatediv1: {
    border: "1px solid #5f5d5d",
    width: 500,
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    position: "relative",
    bottom: 100,
    height: 80,
    margin: "10px auto",
    backgroundColor: "#5f5d5d",
  },
  radinp: {
    width: 50,
    height: 30,
    backgroundColor: "transparent",
  },
  texinp: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: 25,
    height: 40,
    outline: "none",
  },
  radinp1: {
    width: 30,
    height: 30,
    color: "transparent", //
    border: "1px solid white",
    backgroundColor: "transparent",
    borderRadius: "50%",
    margin: 10,
    cursor: "pointer",
  },
  textWhite: {
    color: "white",
  },
  del: {
    display: "flex",
    justifyContent: "end",
    marginLeft: "7vh",
    cursor: "pointer",
  },
  add: {
    justifyContent: "end",
    marginLeft: "7vh",
    cursor: "pointer",
  },
  completed:{
    textDecoration: 'line-through'
  },
  checked:{
    backgroundColor:'green'
  }
});

const themeStyles = makeStyles({
  root: {
    backgroundColor: (props) => props.backgroundColor,
    color: (props) => props.color,
    height: "100vh",
    width: "100%",
    border: "1px solid",
    boxSizing: "border-box",
  },
  header: {
    backgroundImage: (props) => `url(${props.backgroundImage})`,
    fontSize: 16,
    height: "40vh",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
});

export const Main = (props) => {
  const classes = themeStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.header}></div>
      {props.children}
    </div>
  );
};

function Todo() {
  const [light, setLight] = useState(false);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const backgroundColor = light ? "whitesmoke" : "#282c34";
  const color = light ? "black" : "white";
  const handleTheme = () => {
    setLight((prev) => !prev);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
 };
 

  const addTask = (e) => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };
      setTaskList([...taskList, taskDetails]);
      setTask("")
    }
  };

  const removeTask = (e, id) => {
      e.preventDefault();
      setTaskList(taskList.filter((t)=> t.id !== id));
  }
 
  const handleCompletedTask = (i) => {
     console.log('item',i)
     const lists = [...taskList];
     const temp = lists[i];
     console.log('temp',temp)
     temp.isCompleted = !temp.isCompleted;
     setTaskList(lists)
  }
  const classes = useStyles();
  return (
    <Main
      backgroundColor={backgroundColor}
      backgroundImage={light ? DarkBG : LightBG}
      color={color}
    >
      <div className={classes.updatediv}>
        <div>
          <h3>TO DO</h3>
        </div>
        <div>
          {light ? (
            <NightsStayIcon
              className={classes.moonIcon}
              onClick={handleTheme}
            />
          ) : (
            <WbSunnyIcon className={classes.moonIcon} onClick={handleTheme} />
          )}
        </div>
      </div>
      <div
        className={`${classes.updatediv1} ${light ? "" : classes.textWhite}`}
        color={color}
      >
        <input type="radio" className={classes.radinp} disabled />
        <input
          type="text"
          className={classes.texinp}
          onChange={(e) => handleChange(e)}
          placeholder="Create a new todo"
          value={task}
        />
        <button className={classes.add} onClick={addTask}>
          +
        </button>
      </div>
      <div>
      {taskList.length>0? (
          <div >
              {taskList.map((t,i)=>{
                  return <div className={classes.updatediv1} >
                  <div className={`${classes.radinp1} ${t.isCompleted ?classes.checked : ""}`} onClick= {() => handleCompletedTask(i)}></div>
                  <input type="text"  className={`${classes.texinp} ${t.isCompleted ? classes.completed : ""}`} value={t.value} readOnly/>
                  <DeleteForeverIcon className={classes.del} onClick={(e) => removeTask(e, t.id)} />
                   </div>
                   })}
          </div>)
      :null}
      </div>
    </Main>
  );
}

export default Todo;