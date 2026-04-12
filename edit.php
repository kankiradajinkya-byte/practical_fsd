<?php include 'db.php';

$id = $_GET['id'];
$result = mysqli_query($conn, "SELECT * FROM student WHERE id=$id");
$row = mysqli_fetch_assoc($result);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    mysqli_query($conn, "UPDATE student SET name='$name', email='$email', mobile='$mobile', department='$department' WHERE id=$id");
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html>
<head><title>Edit Student</title></head>
<body>
<h2>Edit Student</h2>
<form method="POST">
  Name: <input type="text" name="name" value="<?= $row['name'] ?>"><br><br>
  Email: <input type="text" name="email" value="<?= $row['email'] ?>"><br><br>
  Mobile: <input type="text" name="mobile" value="<?= $row['mobile'] ?>"><br><br>
  Department: <input type="text" name="department" value="<?= $row['department'] ?>"><br><br>
  <input type="submit" value="Update">
  <a href="index.php">Cancel</a>
</form>
</body>
</html>