import { useState } from "react";
import { Card } from "react-bootstrap";
import "./Dashboard.css";

// import the props ffrom dashboard 
// comnvert them into variables
// and use the variables in place of hard coded values

export function DashboardGlobal(props){

    // console.log(typeof props.data.avgVal);
    return(

        <div className="global">
            <div className="box curved-border">
                <Card className="shadow-card">
                    <Card.Body>
                        <Card.Title>Transactions</Card.Title>
                        <Card.Text>
                            {props.data.cnt}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="box curved-border">
                <Card className="shadow-card">
                    <Card.Body>
                        <Card.Title>Avg. Value per Txn</Card.Title>
                        <Card.Text>
                            { (props.data.cnt == 0 ) && 0}
                            { (props.data.cnt != 0 ) && props.data.avgVal  }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="box curved-border">
                <Card className="shadow-card">
                    <Card.Body>
                        <Card.Title>Min/Max Val per Txn</Card.Title>
                        <Card.Text>
                            { props.data.min} / {props.data.max}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="box curved-border">
                <Card className="shadow-card">
                    <Card.Body>
                        <Card.Title>Total USDT PayOut</Card.Title>
                        <Card.Text>
                            {props.data.totalVal}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="box curved-border">
                <Card className="shadow-card">
                    <Card.Body>
                        <Card.Title>Unique UserID's</Card.Title>
                        <Card.Text>
                            {props.data.uniqueUserIds}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}