<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head><title>Student CRUD</title></head>
<body>
<h2>Student List</h2>
<a href="add.php">Add New Student</a>
<table border="1">
  <tr>
    <th>ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>Department</th><th>Actions</th>
  </tr>
  <?php
    $result = mysqli_query($conn, "SELECT * FROM student");
    while ($row = mysqli_fetch_assoc($result)) {
      echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['name']}</td>
        <td>{$row['email']}</td>
        <td>{$row['mobile']}</td>
        <td>{$row['department']}</td>
        <td>
          <a href='edit.php?id={$row['id']}'>Edit</a> | 
          <a href='delete.php?id={$row['id']}' onclick='return confirm(\"Delete?\")'>Delete</a>
        </td>
      </tr>";
    }
  ?>
</table>
</body>
</html>