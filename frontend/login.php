<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "imt_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Validate inputs
if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit();
}

// Prepare and execute query
$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // User found
    $stmt->bind_result($id, $hashedPassword);
    $stmt->fetch();

    // Verify password
    if (password_verify($password, $hashedPassword)) {
        // Login successful
        echo json_encode(["status" => "success", "message" => "Login successful!"]);
        // Optionally, start a session here
    } else {
        // Incorrect password
        echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
    }
} 
else {
    // User not found
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
