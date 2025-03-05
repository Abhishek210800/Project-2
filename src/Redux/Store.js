import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./CompaniesSlice";
import categoriesReducer from "./CategoriesSlice";
import eventsReducer from './EventsSlice';
import authReducer from './AuthSlice';
import directoryReducer from "./DirectorySlice";
import companyReducer from './CompanyDetailsSlice';




const store = configureStore({
  reducer: {
    companies: companiesReducer,
    categories: categoriesReducer,
    events: eventsReducer,
    auth: authReducer,
    directory: directoryReducer,
    company: companyReducer,


  },
});

export default store;
