import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/stutdent.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute,
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;