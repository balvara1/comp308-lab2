import React from 'react'
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';

export default function EnrolledCourseCard({ course }) {
  return (
    <Card elevation={4}>
			<CardHeader
				// avatar={
				// 	<Avatar>
				// 		{course.courseName[0].toUpperCase()}
				// 	</Avatar>
				// }
				title={course.courseCode}
				subheader={course.courseName}
        action={
          <IconButton onClick={() => console.log('drop course -> ', course.courseCode)}>
            <DeleteOutlineOutlined />
          </IconButton>
        }
			/>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Semester: {course.semester}<br />
          Section: {course.section}
        </Typography>
      </CardContent>
    </Card>
  )
}
