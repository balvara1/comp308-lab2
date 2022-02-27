import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import StudentList from './components/StudentList';
import Layout from './components/Layout';
import EnrolledCourses from './components/EnrolledCourses';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/mycourses" element={<EnrolledCourses />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

