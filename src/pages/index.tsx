import Card from "@/components/Card/Card";
import Button from "@/components/button/Button";
import illustationIcon from "@/icons/illustation.svg";

const Home = () => {
  return (
    <>
      <Card className="" onClick={ () => console.log('聯絡我們') }>
        <Card.Infomation>
          <Card.Title text="CONTACT US"></Card.Title>
          <Card.Description text="聯絡我們"></Card.Description>
        </Card.Infomation>
        <Card.Photo src={illustationIcon}></Card.Photo>
      </Card>

      <Button
        type="large"
        theme="primary"
        className=""
      ></Button>
      <Button
        type="medium"
        theme="primary"
        className=" "
      ></Button>
      <Button
        type="small"
        theme="primary"
        className=" "
      ></Button>
      <Button
        type="large"
        theme="secondary"
        className=" "
      ></Button>
      <Button
        type="medium"
        theme="secondary"
        className=" "
      ></Button>
      <Button
        type="small"
        theme="secondary"
        className=" "
      ></Button>
      <Button
        type="large"
        theme="normal"
        className=" "
      ></Button>
      <Button
        type="medium"
        theme="normal"
        className=" "
      ></Button>
      <Button
        type="small"
        theme="normal"
        className=" "
      ></Button>
    </>
  )
}

export default Home;
