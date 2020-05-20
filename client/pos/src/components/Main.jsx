import React, {useState} from "react";

function Main(){
  const [visible, setVisible] = useState({
    about: false,
    history: false,
    service: false
  });

  const displaySlide = e => {
    const slideId = e.target.id;
    setVisible({
      about: false,
      history: false,
      service: false
    });
    setVisible(initialValue => {
      return {...initialValue, [slideId]: true};
    });
  }
  return (
    <div className="container main">
      <div className="container hero">
        <div className="content-main">
          <div className="text">
            <p>Get your favourite product now</p>
            <hr />
            <a href="#" className="btn">Discover More</a>
          </div>

          <div className="show-profiles">
            <div className="slides">
            <p id="AboutSlide" className="slide" hidden={!visible.about}>The point of sale (POS) or point of purchase (POP) is the time and place where a retail transaction is completed. At the point of sale, the merchant calculates the amount owed by the customer, indicates that amount, may prepare an invoice for the customer (which may be a cash register printout), and indicates the options for the customer to make payment. It is also the point at which a customer makes a payment to the merchant in exchange for goods or after provision of a service. After receiving payment, the merchant may issue a receipt for the transaction, which is usually printed but can also be dispensed with or sent electronically</p>
            <p id="HistorySlide" className="slide" hidden={!visible.history}>Early electronic cash registers (ECR) were controlled with proprietary software and were limited in function and communication capability. In August 1973, IBM released the IBM 3650 and 3660 store systems that were, in essence, a mainframe computer used as a store controller that could control up to 128 IBM 3653/3663 point of sale registers. This system was the first commercial use of client-server technology, peer-to-peer communications, local area network (LAN) simultaneous backup, and remote initialization. By mid-1974, it was installed in Pathmark stores in New Jersey and Dillard's department stores. </p>
            <p id="ServiceSlide" className="slide" hidden={!visible.service}>The design of the sale window is the most important one for the user. This user interface is highly critical when compared to those in other software packages such as word editors or spreadsheet programs where the speed of navigation is not so crucial for business performance.
            For businesses at prime locations where real estate comes at a premium, it can be common to see a queue of customers. The faster a sale is completed the shorter the queue time which improves customer satisfaction, and the less space it takes, which benefits shoppers and staff. High-traffic operations such as grocery outlets and cafes need to process sales quickly at the sales counter so the UI flow is often designed with as few popups or other interruptions to ensure the operator isn't distracted and the transaction can be processed as quickly as possible. </p>
            </div>
          </div>

          <div className="profiles-name" id="profiles-name">
            <ul>
              <li><a href="#" class="profile" id="about" onClick={displaySlide}>About</a></li>
              <li><a href="#" class="profile" id="history" onClick={displaySlide}>History</a></li>
              <li><a href="#" class="profile" id="service" onClick={displaySlide}>Service</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Main;
