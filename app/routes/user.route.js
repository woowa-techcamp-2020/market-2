import users from "../controller/user.controller";
import { Router } from "express";
const router = Router();

/**
 * 유저 회원가입
 * post: /api/user
 * req.body { uid, password, confirm, phone, address, fullName, advertiseAgree }
 * response { user }
 */
router.post("/", users.signup);

/**
 * 유저 전체 리스트
 * get: /api/user
 * response [{user}, ]
 */
router.get("/", users.getAll);

/**
 * 유저 로그인
 * post: /api/user/login
 * req.body { uid, password }
 * response { user }
 */
router.post("/login", users.login);

/**
 * 유저 중복 아이디 확인
 * post: /api/user/dup/:uid
 * response { result: true }
 */
router.get("/dup/:uid", users.existsById);

module.exports = router;
