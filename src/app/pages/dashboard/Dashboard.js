import React, { useEffect} from "react";
import { connect } from 'react-redux';
import { Card } from "react-bootstrap";


const Dashboard = (props) => {

  useEffect(() => {
  }, []);

  return <div className="row">
    <div className="col-md-12">
      <div className="kt-section">
        <Card>
          <Card.Body>
            {/* <button className="btn btn-primary" onClick={(e) => fakeData(e)}>Fake Data</button> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps, null)(Dashboard);
