const model = require("../../model/user_data.model");
const {
  generateToken,
  login: localLogin,
  register,
} = require("../../services/auth.service");

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   let currentUser = [];

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide both username and password." });
//   }

//   // get bypass password
//   const bypass = process.env.BYPASS_PASSWORD;
//   // match bypass with user entered password
//   if (password == bypass) {
//     currentUser = await model.getAccount(username);
//   } else {
//     // normal login
//     let employeeData = await loginAPI(username, password);
//     if (employeeData.status == true) {
//       currentUser = await model.getAccount(username);
//     }
//   }

//   // if user match with user
//   if (currentUser.length > 0) {
//     token = generateToken({ ...currentUser[0] });
//     return res.json({ currentUser, token });
//   } else {
//     return res
//       .status(404)
//       .json({ message: "Invalid username or password", status: "false" });
//   }
// };

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password." });
  }

  const bypass = process.env.BYPASS_PASSWORD;
  let currentUser = [];

  // Check for bypass password
  if (password === bypass) {
    currentUser = await model.getAccount(username);
  } else {
    // Attempt local login first
    const localLoginResponse = await localLogin(username, password);
    if (localLoginResponse.success) {
      currentUser = await model.getAccount(username);
    } else {
      // Fall back to API login
      let employeeData = await localLogin(username, password);
      if (employeeData.status === true) {
        currentUser = await model.getAccount(username);
      }
    }
  }

  if (currentUser.length > 0) {
    const token = generateToken({ ...currentUser[0] });
    return res.json({ currentUser, token });
  } else {
    return res
      .status(404)
      .json({ message: "Invalid username or password", status: "false" });
  }
};

const registerUser = async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password." });
  }

  const registerResponse = await register(username, password, name);
  if (registerResponse.success) {
    return res.status(201).json({ message: "User registered successfully." });
  } else {
    return res.status(500).json({ message: "Registration failed." });
  }
};

module.exports = {
  login,
  registerUser,
};
