import React, { useEffect, useState,  } from 'react'
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import EnrolledCourseCard from './EnrolledCourseCard';

// save student id on login
const studentId = "6215c1c42a0d1719683185a1";

const useStyles = makeStyles((theme) => {
	return {
		courseListHeading: {
			paddingBottom: "5px"
		}
	}
})

export default function EnrolledCourses() {
	const classes = useStyles();
  const [student, setStudent] = useState(null);
	const [listError, setListError] = useState(false);
	const apiUrl = `http://localhost:5000/student/${studentId}`;

	useEffect(() => {
		const fetchData = async () => {
			axios.get(apiUrl)
				.then(result => {
					console.log('get student result: ', result);
					setStudent(result.data);

				}).catch((error) => {
					console.log('error fetching get student data: ', error);
				})
		};

		fetchData();
	}, [])

  return (
    <div>
			{student && student.enrolledCourses.length > 0 ?
				<div>
					<Typography variant="h5" color="textPrimary" className={classes.courseListHeading}>
						My Courses
					</Typography>

					<Grid container spacing={3}>
						{student.enrolledCourses.map(course => (
							<Grid item key={course.courseCode} xs={12} md={6} lg={4}>
								<EnrolledCourseCard course={course} />
							</Grid>
						))}
					</Grid>
				</div>
				:
				<Typography variant="h5" color="textPrimary">
					No Enrolled Courses Found
				</Typography>
			}
		</div>
  )
}
