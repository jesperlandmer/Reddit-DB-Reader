import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Program
{

  private static String _jsonLink = "/Users/Jesper/reddit-db/RC_2007-10";

  public static void main(String[] args)
  {
    Connection connection = null;

    try
    {
        // create a database connection
        connection = DriverManager.getConnection("jdbc:sqlite:reddit.db");
        Statement statement = connection.createStatement();
        statement.setQueryTimeout(30);  // set timeout to 30 sec.

        statement.executeUpdate("DROP TABLE IF EXISTS users");
        statement.executeUpdate("DROP TABLE IF EXISTS subjects");
        statement.executeUpdate("DROP TABLE IF EXISTS posts");

        statement.executeUpdate("" +
            "CREATE TABLE users (" +
            "name STRING PRIMARY KEY)");
        statement.executeUpdate("" + 
            "CREATE TABLE subjects (" +
            "subreddit_id STRING PRIMARY KEY," +
            "subreddit STRING)");
        statement.executeUpdate("" +
            "CREATE TABLE posts (" +
            "id STRING PRIMARY KEY," +
            "parent_id STRING," +
            "link_id STRING," +
            "name STRING," +
            "author STRING," +
            "body STRING," +
            "subject STRING," +
            "score INTEGER," +
            "created_utc STRING)");

        statement.executeUpdate("INSERT INTO users VALUES('Jesper')");
        ResultSet rs = statement.executeQuery("SELECT * FROM users LIMIT 10");

      while(rs.next())
      {
        // read the result set
        System.out.println("name = " + rs.getString("name"));
      }
    }
    catch(SQLException e)
    {
      // if the error message is "out of memory",
      // it probably means no database file is found
      System.err.println(e.getMessage());
    }
    finally
    {
      try
      {
        if(connection != null)
          connection.close();
      }
      catch(SQLException e)
      {
        // connection close failed.
        System.err.println(e);
      }
    }
  }
}