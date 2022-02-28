import React, { useEffect, useState,  } from 'react'
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import EnrolledCourseCard from './EnrolledCourseCard';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from "../auth";

const useStyles = makeStyles((theme) => {
	return {
		courseListHeading: {
			paddingBottom: "5px"
		}
	}
})

export default function EnrolledCourses({ showSnackBar }) {
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const { authTokens } = useAuth();
	const [studentId, setStudentId] = useState(authTokens.data.id);
	const classes = useStyles();
  const [student, setStudent] = useState(null);
	const [courses, setCourses] = useState([]);
	const [course, setCourse] = useState(null);
	const [dropCourseConfirmMsg, setDropCourseConfirmMsg] = useState('');
	const [openConfirmDropCourse, setOpenConfirmDropCourse] = React.useState(false);
	const [listError, setListError] = useState(false);
	const apiUrl = `http://localhost:5000/student/`;

	const handleAction = (course, action) => {
		setCourse(course);
		console.log('Do ', action);
		console.log('On course ', course);
		if (action === 'Drop Course') {
			const confirmMsg = `Are you sure you want to drop ${course.courseCode} - ${course.courseName}?`;
			setDropCourseConfirmMsg(confirmMsg);
			setOpenConfirmDropCourse(true);
		}
	}

	const executeDropCourse = () => {
		let sbMsg = '';
		console.log('confirm drop on course ', course);
		const updatedCourses = courses.filter(aCourse => aCourse.courseCode !== course.courseCode)

		const studentRequest = {...student};
		studentRequest.enrolledCourses = updatedCourses;
		console.log('update request -> ', studentRequest);

		axios.put(apiUrl, studentRequest)
      .then((result) => {
				// set the local copy of courses
				setCourses(updatedCourses);
				sbMsg = `Drop course ${course.courseCode} - ${course.courseName} successful`;
				showSnackBar({message: sbMsg, severity: 'success'});
      })
			.catch((error) => {
				sbMsg = `Drop course ${course.courseCode} - ${course.courseName} failed`;
				showSnackBar({message: sbMsg, severity: 'error'});
			});

		// clear selected course 
		onCloseConfirmDropCourseDialog();
	}

	const onCloseConfirmDropCourseDialog = () => {
		console.log('onCloseConfirmDropCourseDialog');
		setCourse(null);
		setOpenConfirmDropCourse(false);
	}

	useEffect(() => {
		const getStudentUrl = apiUrl + studentId;
		const fetchData = async () => {
			axios.get(getStudentUrl)
				.then(result => {
					console.log('get student result: ', result);
					setStudent(result.data);

				}).catch((error) => {
					console.log('error fetching get student data: ', error);
				})
		};

		fetchData();
	}, [studentId])

	// get the current courses of the student
	useEffect(() => {
		if (student && student.enrolledCourses.length > 0) {
			setCourses(student.enrolledCourses);
		}
	}, [student])

  return (
    <div>
			{courses.length > 0 ?
				<div>
					<Typography variant="h5" color="textPrimary" className={classes.courseListHeading}>
						My Courses
					</Typography>

					<Grid container spacing={3}>
						{courses.map(course => (
							<Grid item key={course.courseCode} xs={12} md={6} lg={4}>
								<EnrolledCourseCard course={course} handleAction={handleAction} />
							</Grid>
						))}
					</Grid>
					<Dialog
						open={openConfirmDropCourse}
						onClose={onCloseConfirmDropCourseDialog}
      		>
						<DialogTitle>
         		 Confirm Drop Course
        		</DialogTitle>

						<DialogContent>
         	 		<DialogContentText>
            		{dropCourseConfirmMsg}
          		</DialogContentText>
        		</DialogContent>

        		<DialogActions>
          		<Button autoFocus onClick={onCloseConfirmDropCourseDialog}>
            		Cancel
          		</Button>
          		<Button onClick={executeDropCourse}>Confirm</Button>
        		</DialogActions>
					</Dialog>
				</div>
				
				:
				<Typography variant="h5" color="textPrimary">
					No Enrolled Courses Found
				</Typography>
			}
		</div>
  )
}

