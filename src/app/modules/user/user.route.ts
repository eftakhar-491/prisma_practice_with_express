import { Router } from "express";
import { UserControllers } from "./user.controller";

// /api/v1/user/
const router = Router();

router.post(
  "/create",

  UserControllers.createUser
);
router.get("/get-all-users", UserControllers.getAllUsers);

export const UserRoutes = router;
