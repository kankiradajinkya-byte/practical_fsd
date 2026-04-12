<?php include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    mysqli_query($conn, "INSERT INTO student (name, email, mobile, department) 
                         VALUES ('$name', '$email', '$mobile', '$department')");
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html>
<head><title>Add Student</title></head>
<body>
<h2>Add New Student</h2>
<form method="POST">
  Name: <input type="text" name="name" required><br><br>
  Email: <input type="text" name="email" required><br><br>
  Mobile: <input type="text" name="mobile" required><br><br>
  Department: <input type="text" name="department" required><br><br>
  <input type="submit" value="Add Student">
  <a href="index.php">Cancel</a>
</form>
</body>
</html>