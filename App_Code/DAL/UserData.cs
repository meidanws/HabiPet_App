using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for UserData
/// </summary>
public class UserData
{
    private readonly Database _db;

    public UserData()
    {
        _db = new Database();
    }

    internal DataTable GetUserUsers()
    {
        string cmd = "select * from Users";
        return _db.ExecReader(cmd);
    }

    internal DataTable GetUserDetailsById(int userId)
    {
        string cmd = "Select * from [dbo].[Users] where [UserId] =" + userId;
        return _db.ExecReader(cmd);
    }


    internal DataTable GetAllUsers()
    {
        string cmd = "select * from Users";
        return _db.ExecReader(cmd);
    }

    internal DataTable CheckUser(string email, string password)
    {
        string cmd = "select * from [dbo].[Users] where [Email]='"+ email + "' and [Password]='"+ password + "'";
        return _db.ExecReader(cmd);
    }

    internal DataTable AddUser(string name, string lastName, string email, string password)
    {
        string cmd = "Insert into [dbo].[Users] ([FirstName],[LastName],[Email],[Password],[GenderId]) Values ('"+name+"','"+lastName+"','"+email+"','"+password+"',1)";
        int i = _db.ExecNonQuery(cmd);
        if (i != 0) {

            return CheckUser(email, password);
        }
        return null;
    }

    internal DataTable GetUserPets(string UserId)
    {
        string cmd = "SELECT ImgPath, PetId FROM dbo.Pet WHERE UserId =" + UserId;

        return _db.ExecReader(cmd);
    }


    //internal DataTable GetUser(string UserId)
    //{
    //    string cmd = "SELECT * FROM Users WHERE UserId =" + UserId;

    //    return _db.ExecReader(cmd);
    //}


    internal DataTable GetUserServiceOnAir(string loginId)
    {
        string cmd = "select ServiceOnAirId, PetId, PetsitterId, OridainedDate, StartTime, EndTime, Status, ServiceId from v_serviceOnAir where [PetsitterId] = " + loginId + " or UserId= " + loginId;
        return _db.ExecReader(cmd);
    }

   internal DataTable GetMessages(int UserId)
    {
       
        string cmd = "Exec InboxMembers " + UserId;
        return _db.ExecReader(cmd);
    }
    
      internal DataTable GetFavoritesList(int UserId)
    {

        string cmd = "Exec v_fevorit " + UserId;
        return _db.ExecReader(cmd);
    }



}