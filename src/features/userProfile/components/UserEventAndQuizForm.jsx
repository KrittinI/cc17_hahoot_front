import { useNavigate } from "react-router-dom";
import BoxContain from "../../../components/BoxContain";
import CardBoxInProfile from "../../../components/CardBoxInProfile";

export default function UserEventAndQuizForm() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 ">
      <BoxContain title="My Event" hight={30} onClick={() => navigate("/")}>
        <div className="flex justify-center gap-6 h-52 flex-wrap my-4">
          <CardBoxInProfile />
          <CardBoxInProfile />
          <CardBoxInProfile />
          <CardBoxInProfile />
        </div>
      </BoxContain>
      <BoxContain
        title="My Quiz"
        hight={30}
        onClick={() => navigate("/")}
      ></BoxContain>
    </div>
  );
}
