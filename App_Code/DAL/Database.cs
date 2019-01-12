using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

/// <summary>
/// Summary description for Database
/// </summary>
public class Database
{

    #region Init
    public SqlConnection Con { get; private set; }

    public Database()
    {
        Con = new SqlConnection(WebConfigurationManager.ConnectionStrings["HabiPetConnectionString"].ConnectionString); //prod
    }

    #endregion

    #region Helpers
    public SqlConnection GetConnnection() // open the connection 
    {
        if (Con.State == ConnectionState.Closed)
        {
            Con.Open();
        }
        return Con;
    }

    public int ExecNonQuery(string sql) //for sql procs
    {
        SqlCommand cmd = new SqlCommand(sql, GetConnnection());
        int rowsaffected = -1;
        rowsaffected = cmd.ExecuteNonQuery();
        Con.Close();
        return rowsaffected;
    }

    public object ExecScalar(string sql) //for functions that returns scalar (only one paranet return)
    {
        SqlCommand cmd = new SqlCommand(sql, GetConnnection());
        object obj = -1;
        obj = cmd.ExecuteScalar();
        Con.Close();
        return obj;
    }

    public DataTable ExecReader(string sql) //for select statments
    {
        SqlCommand cmd = new SqlCommand(sql, GetConnnection());
        SqlDataReader sdr;
        DataTable dt = new DataTable();

        sdr = cmd.ExecuteReader();
        dt.Load(sdr);
        Con.Close();
        return dt;
    }

    #endregion
}
