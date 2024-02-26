import Carousel from "react-bootstrap/Carousel";

function Carousell() {
  return (
    <Carousel style={{height:"64vh"}}>
      <Carousel.Item  style={{height:"100%"}}>
        <img
          className=" w-100 "
          src="https://www.starlinkindia.com/blog/wp-content/uploads/2016/08/Our-Leave-Management-System-1.jpg"
          alt="First slide"
          style={{height:"100%",width:"100%",objectFit:"cover"}}
        />
        <Carousel.Caption>
          <h5 className="text-dark">First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" w-100 "
          src="https://cloud.squidex.io/api/assets/sorwe-cms/ab723ac3-dc60-4364-adcc-660f45644b56"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" w-100 "
          src="https://blog.darwinbox.com/hubfs/MicrosoftTeams-image%20%287%29-Dec-02-2022-12-31-53-6651-PM.png#keepProtocol"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;
