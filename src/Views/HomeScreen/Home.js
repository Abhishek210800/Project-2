import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDirectoryData } from "../../Redux/DirectorySlice";
import "./Styles/style.css";
import StickyNav from "./StickyNav";
import HeroCont from "./HeroCont";
import MainCont from "./MainCont";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDirectoryData());
  }, [dispatch]);

  return (
    <div>
      <StickyNav />
      <HeroCont />
      <MainCont />
      <Footer />
    </div>
  );
};

export default Home;
