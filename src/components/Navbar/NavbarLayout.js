import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import App from "../RedeemV1/App";
import {RedeemV2} from "../RedeemV2/RedeemV2";
import { Dashboard } from "../Dashboard/Dashboard";
import { Help } from "../Help/Help";
import "../Help/Help.css";
import "../Navbar/navbar.css";
import { NotFound } from "../Not_Found/NotFound";

import { fetchDynamoDb } from "../../Fetch_Data/fetchDynamoDb";

import { globalBitmapmaker } from "../../Logic/globalBitmapMaker";
import { globalBitmapmakerV2 } from "../../Logic/globalBitmapMakerV2";
import { globalBitmapmakerSend } from "../../Logic/globalBitmapMakerSend";

import LoaderScreen from "../LoaderScreen.js/loaderScreen";
import { Send } from "../Send/Send";
import NavLinkItem from "./NavLinkItem"; // Update the path accordingly
import { WalletAnalysis } from "../WalletAnalysis/WalletAnalysis";

function NavbarLayout() {
  const [arrayV1, setArrayV1] = useState([]);
  const [arrayV2, setArrayV2] = useState([]);
  const [arraySend , setArraySend] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDB() {
      setIsLoading(0)

      // fetching data 

      const dataProd = await fetchDynamoDb("prod" , "redeem"); // working on prod 
      console.log("prod data loaded ");
      const dataPre = await fetchDynamoDb("pre-prod" , "redeem"); // working on pre-prod
      console.log("pre-prod data loaded");

      const dataProdSend = await fetchDynamoDb("prod" , "send"); // working on prod 
      console.log("prod data Send loaded ");
      const dataPreSend = await fetchDynamoDb("pre-prod" , "send"); // working on pre-prod
      console.log("pre-prod Send data loaded");

      // seeting data for V1

      const bitmapProdV1 = globalBitmapmaker(dataProd);
      const bitmapPreV1 = globalBitmapmaker(dataPre);

      // setting data V2

      const bitmapProdV2 = globalBitmapmakerV2(dataProd);
      const bitmapPreV2 = globalBitmapmakerV2(dataPre);

      // setting data for Send

      const bitmapProdSend = globalBitmapmakerSend(dataProdSend);
      const bitmapPreSend = globalBitmapmakerSend(dataPreSend);

      setIsLoading(1);

      setArrayV1([dataProd, bitmapProdV1 , dataPre, bitmapPreV1]);
      setArrayV2([dataProd, bitmapProdV2 , dataPre, bitmapPreV2]);
      setArraySend([dataProdSend , bitmapProdSend , dataPreSend ,bitmapPreSend ])

      // console.log(dataProdSend);4
    }
    fetchDB();
  }, []);

  return (
      <BrowserRouter>
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Aws Transaction Analysis Dashboard</Navbar.Brand>
            <Nav className="mr-auto">
              <NavLinkItem to="/">Redeem V1</NavLinkItem>
              <NavLinkItem to="/RedeemV2">Redeem V2</NavLinkItem>
              <NavLinkItem to="/Send">Send</NavLinkItem>
              <NavLinkItem to="/dashboard">Dashboard</NavLinkItem>
              <NavLinkItem to="/help">Help!</NavLinkItem>
              <NavLinkItem to="/WalletAnalysis">Wallet Analysis</NavLinkItem>
            </Nav>
          </Container>
        </Navbar>
        {
          isLoading === 0 &&
          <Routes>
            <Route path="/" element={<LoaderScreen/>} />
            <Route path="/dashboard" element={<LoaderScreen />} />
            <Route path="/RedeemV2" element={<LoaderScreen />} />
            <Route path="/Send" element={<LoaderScreen />} />
            <Route path="/help" element={<LoaderScreen />} />
            <Route path="/WalletAnalysis" element={<LoaderScreen />} />
            <Route path="*" element={<LoaderScreen />} />
          </Routes>
        }
        { isLoading === 1 && 
        <Routes>
          <Route path="/" element={<App array = {arrayV1} />} />
          <Route path="/RedeemV2" element={<RedeemV2 array = {arrayV2} />} />
          <Route path="/dashboard" element={<Dashboard array = {arrayV1} />} />
          <Route path="/Send" element={<Send array = {arraySend} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/WalletAnalysis" element={<WalletAnalysis/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        }
      </BrowserRouter>
  );
}

export default NavbarLayout;
