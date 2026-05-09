import style from "./app.module.scss";
import Options from "./components/options";

function App() {
  return (
    <div className={style.app}>
      <Options />
    </div>
  );
}

export default App;
