using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PetsitterData
/// </summary>
public class PetsitterData : UserData
{
    private readonly Database _db;

    public PetsitterData()
    {
        _db = new Database();
    }

    internal DataTable GetAnimalType()
    {
        string cmd = "select * from Petsitter";
        return _db.ExecReader(cmd);
    }

    internal DataTable GetPetsitterDetails(string petsitterId)
    {
        string cmd = "SELECT UserId, BirthDate, FirstName, LastName, ImgPath, About, CityName,Street,HouseNumber, Rate, ReviewCount, IsVisable" +
                    " FROM dbo.V_search" +
                    " WHERE UserId = " + petsitterId;

        return _db.ExecReader(cmd);
    }

    internal DataTable GetPetsitterPriceList(string petsitterId)
    {
        string cmd = "SELECT * FROM V_PetsiterPriceList where [petsitterId] = " + petsitterId;

        return _db.ExecReader(cmd);

    }

    internal DataTable GetPetsitterReviews(string petsitterId)
    {

        string cmd = "SELECT ReviewId, Timestamp, ReviewText, Rate, UserId, FirstName, LastName, ImgPath, PetsitterId FROM V_PetsitterReviews where PetsitterId = " + petsitterId;
        return _db.ExecReader(cmd);
    }

    internal DataTable FilterPetsitter(int UserId, int AnimalType, string SizeCategory, int ServiceId, string UnavailableStartDate, string UnavailableEndDate, decimal Price, string LivingArea, string StartTime, string EndTime)
    {
        string cmd = "exec proc_Filter " + UserId + ", " + AnimalType + ", ";
        cmd += (SizeCategory == "null") ? "null, " : "'" + SizeCategory + "', ";
        cmd += ServiceId + ", ";
        cmd += "'" + UnavailableStartDate + "', ";
        cmd += "'" + UnavailableEndDate + "', ";
        cmd += Price + ", ";
        cmd += (LivingArea == "null") ? "null, " : "'" + LivingArea + "', ";
        cmd += (StartTime == "null") ? "null, " : "'" + StartTime + "', ";
        cmd += (EndTime == "null") ? "null" : "'" + EndTime + "'";
         return _db.ExecReader(cmd);
    }

    internal int InsertReview(string UserId, string PetsitterId, string Rate, string ReviewText, string TimeStamp)
    {
        string cmd = "Insert into ReviewForPetsiter ([Timestamp],[ReviewText],[UserId],[PetsitterId],[Rate]) Values ('" + TimeStamp + "','" + ReviewText + "','" + UserId + "','" + PetsitterId + "','" + Rate + "')";
        int i = _db.ExecNonQuery(cmd);
        return i;
    }

    /*internal Petsitter GetPetsitter(string id)
    {
        Service _service = new Service();
        Petsitter _p = _service.ConvertDataTable(GetPetsitterDetails(id))[0];
        _p.PriceList = _service.ConvertDataTable(GetPetsitterPriceList(id));
        _p.UserPets = _service.ConvertDataTable(GetUserPets(id));
        return _p;
    }*/


    internal DataTable InsertProfilePicture(string UserId, string Image)
    {
        string cmd = "Update [dbo].[Users] Set [ImgPath] = '" + Image + "' where [UserId] = " + UserId;
        return _db.ExecReader(cmd);
    }

    internal DataTable GiveAllServices()
    {
        string cmd = "Select * from [dbo].[Service]";
        return _db.ExecReader(cmd);
    }

    internal DataTable UpdatePriceForService(int PetSitterId, int ServiceId, int Price)
    {
        string cmd = "Exec UpdatePriceForService " + PetSitterId + "," + ServiceId + "," + Price;
        return _db.ExecReader(cmd);
    }



    internal int UpdatePetList(string PetName, int PetGender, int UserId, int TypeId, int SizeId, string ImgPath, string Description)
    {
        string cmd = "";
        if (SizeId == 0)
        {
            cmd = "Insert Into[dbo].[Pet]([PetName],[PetGender],[UserId],[TypeId],[ImgPath],[Description]) Values ('" + PetName + "'," + PetGender + "," + UserId + "," + TypeId + ",'" + ImgPath + "','" + Description + "')";
        }
        else
        {
            cmd = "Insert Into[dbo].[Pet]([PetName],[PetGender],[UserId],[TypeId],[SizeId],[ImgPath],[Description]) Values ('" + PetName + "'," + PetGender + "," + UserId + "," + TypeId + "," + SizeId + ",'" + ImgPath + "','" + Description + "')";
        }
        return _db.ExecNonQuery(cmd);
    }

    internal int UpdatePetsitterVisable(int UserId, string IsVisable)
    {
        string cmd = "UPDATE [dbo].[Petsitter] SET [IsVisable] = '" + IsVisable + "' WHERE [PetsitterId] = " + UserId;
        return _db.ExecNonQuery(cmd);
    }
  
     internal int UpdateCity(int userId, string cityName, string streetName, string houseNumber)
    {
        if (houseNumber!="NULL")
        {
            int.Parse(houseNumber);     
        }
        InsertNewCIty(cityName);
        string cmd = "Update [dbo].[Users] Set [CityId] = (select [CityId] from [dbo].[City] where [CityName]='"+ cityName + "'), [Street] = '"+ streetName + "',[HouseNumber]="+ houseNumber + " where [UserId] =" + userId;
        return _db.ExecNonQuery(cmd);
    }

    internal int InsertNewCIty(string cityName)
    {
        string cmd = "Exec[dbo].[InsertCity] '"+ cityName + "'";
        return _db.ExecNonQuery(cmd);
    }


    internal DataTable GetAllPetsitterEvents(int userId)
    {
        string cmd = "  select * from v_Event where [PetsitterId]= " + userId + " or [PetsitterId] = " + userId + "ORDER BY OridainedDate, StartTime";

        return _db.ExecReader(cmd);

    }

    internal DataTable GetUserEventsByDate(int userId, string dayClicked)
    {
        string cmd = "  select * from v_Event where ([PetsitterId]= " + userId + " or [PetsitterId] = " + userId + ") and [OridainedDate]= '"+ dayClicked +"' ORDER BY OridainedDate, StartTime";

        return _db.ExecReader(cmd);

    }

    internal object Favorite(string userId, string petsitterId)
    {
        string cmd = "exec Favorite " + petsitterId + "," + userId;
        return _db.ExecNonQuery(cmd);
    }

    internal object InsertEvent(string userId, string petsitterId, string serviceId, string startD, string endD, string startT, string endT)
    {
        string cmd = "exec InsertEvent " + userId + "," + petsitterId + "," + serviceId + ",'" + startD + "','" + endD + "','" + startT + "','" + endT+"'";
        return _db.ExecNonQuery(cmd);
    }

}




