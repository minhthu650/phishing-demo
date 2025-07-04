
// Giả lập người dùng (dữ liệu mẫu)
let users = [];  // Lưu trữ người dùng trong mảng

// Lấy các phần tử DOM
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");
const regUsernameInput = document.getElementById("reg-username");
const regPasswordInput = document.getElementById("reg-password");
const loginFormContainer = document.getElementById("login-form-container");
const dashboard = document.getElementById("dashboard");
const userName = document.getElementById("user-name");
const balance = document.getElementById("balance");
const transferForm = document.getElementById("transfer-form");
const amountInput = document.getElementById("amount");
const accountNumberInput = document.getElementById("account-number");
const bankSelect = document.getElementById("bank");

// Xử lý đăng ký tài khoản
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Ngừng hành động mặc định của form (không reload trang)

    const regUsername = regUsernameInput.value;
    const regPassword = regPasswordInput.value;

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    const existingUser = users.find(u => u.username === regUsername);
    if (existingUser) {
        alert("Tên đăng nhập đã được sử dụng!");
        return;
    }

    // Tạo người dùng mới và thêm vào mảng users
    const newUser = {
        username: regUsername,
        password: regPassword,
        name: regUsername,
        balance: 1000,
        accountNumber: `1234${Math.floor(Math.random() * 10000)}`
    };
    users.push(newUser);

    alert("Tạo tài khoản thành công! Bạn có thể đăng nhập ngay.");

    // Ẩn form đăng ký và hiển thị form đăng nhập
    registerForm.classList.add("hidden");
    loginFormContainer.classList.remove("hidden");
});

// Xử lý đăng nhập
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Ngừng hành động mặc định của form

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Tìm kiếm người dùng trong dữ liệu mẫu
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Đăng nhập thành công
        loginFormContainer.classList.add("hidden");
        dashboard.classList.remove("hidden");
        userName.textContent = user.name;
        balance.textContent = user.balance;

        // Lưu người dùng vào sessionStorage (giả lập)
        sessionStorage.setItem("user", JSON.stringify(user));
    } else {
        alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
    }
});

// Xử lý chuyển tiền
transferForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Ngừng hành động mặc định của form

    const amount = parseInt(amountInput.value);
    const accountNumber = accountNumberInput.value;
    const selectedBank = bankSelect.value;
    let user = JSON.parse(sessionStorage.getItem("user"));

    if (amount && amount <= user.balance) {
        // Cập nhật số dư sau khi chuyển tiền
        user.balance -= amount;
        balance.textContent = user.balance;

        // Cập nhật lại dữ liệu người dùng trong sessionStorage
        sessionStorage.setItem("user", JSON.stringify(user));

        alert(`Chuyển tiền thành công!\nĐến ngân hàng: ${selectedBank}\nSố tài khoản: ${accountNumber}`);
    } else {
        alert("Số tiền không hợp lệ hoặc số dư không đủ!");
    }
});
