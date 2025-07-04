// Giả lập người dùng (dữ liệu mẫu)
let users = [];

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");
const regUsernameInput = document.getElementById("reg-username");
const regPasswordInput = document.getElementById("reg-password");
const dashboard = document.getElementById("dashboard");
const userName = document.getElementById("user-name");
const balance = document.getElementById("balance");
const transferForm = document.getElementById("transfer-form");
const amountInput = document.getElementById("amount");
const accountNumberInput = document.getElementById("account-number");
const bankSelect = document.getElementById("bank");

// Điều hướng tab
function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    const target = document.getElementById(tabId);
    if (target) {
        target.classList.add("active");
    }
}

// Hiển thị dashboard nếu đã có người dùng đăng nhập
function loadUserFromSession() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        userName.textContent = user.name;
        balance.textContent = user.balance;
    }
}

// Đăng ký
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const regUsername = regUsernameInput.value.trim();
    const regPassword = regPasswordInput.value.trim();

    if (!regUsername || !regPassword) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    const existingUser = users.find(u => u.username === regUsername);
    if (existingUser) {
        alert("Tên đăng nhập đã được sử dụng!");
        return;
    }

    const newUser = {
        username: regUsername,
        password: regPassword,
        name: regUsername,
        balance: 1000,
        accountNumber: `1234${Math.floor(Math.random() * 10000)}`
    };
    users.push(newUser);

    alert("Tạo tài khoản thành công! Bạn có thể đăng nhập ngay.");
    showTab('login');
});

// Đăng nhập
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        userName.textContent = user.name;
        balance.textContent = user.balance;
        alert("Đăng nhập thành công!");
        showTab('dashboard');
    } else {
        alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
    }
});

// Chuyển tiền
transferForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập trước.");
        return;
    }

    const amount = parseInt(amountInput.value);
    const accountNumber = accountNumberInput.value.trim();
    const selectedBank = bankSelect.value;

    if (!amount || amount <= 0) {
        alert("Số tiền không hợp lệ!");
        return;
    }

    if (amount > user.balance) {
        alert("Số dư không đủ để thực hiện giao dịch!");
        return;
    }

    if (!accountNumber) {
        alert("Vui lòng nhập số tài khoản người nhận.");
        return;
    }

    // Trừ tiền và cập nhật giao diện
    user.balance -= amount;
    balance.textContent = user.balance;
    sessionStorage.setItem("user", JSON.stringify(user));

    alert(`Chuyển tiền thành công!\nĐến ngân hàng: ${selectedBank}\nSố tài khoản: ${accountNumber}`);
});

// Load thông tin người dùng nếu đã đăng nhập sẵn
window.addEventListener("load", () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser) {
        showTab('dashboard');
        loadUserFromSession();
    } else {
        showTab('register'); // mở mặc định phần đăng ký khi mới vào
    }
});
