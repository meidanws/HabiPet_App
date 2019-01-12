using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Summary description for PetSitterAPI
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PetSitterAPI : System.Web.Services.WebService
{
    private readonly Service _service;
    private readonly JavaScriptSerializer _js;
    private readonly PetsitterData _Petsitterdata;
    private const string IMG_PREFIX = "http://proj.ruppin.ac.il/bgroup58/test2/tar2/images/";

    public PetSitterAPI()
    {
        _service = new Service();
        _js = new JavaScriptSerializer();
        _Petsitterdata = new PetsitterData();
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

    public string SearchFilter(string UserId, string AnimalType, string SizeCategory, string ServiceId, string StartDate, string EndDate, string Price, string LivingArea, string StartTime, string EndTime)
    {
        
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("SearchPetsitter", _service.ConvertDataTable(_Petsitterdata.FilterPetsitter(int.Parse(UserId),int.Parse(AnimalType), SizeCategory, int.Parse(ServiceId), StartDate, EndDate, decimal.Parse(Price), LivingArea, StartTime, EndTime)));         
            return _js.Serialize(res);
        }

        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetPetsitter(string petsitterId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("PetsitterProfile", _service.ConvertDataTable(_Petsitterdata.GetPetsitterDetails(petsitterId)));
            res.Add("PetsitterPriceList", _service.ConvertDataTable(_Petsitterdata.GetPetsitterPriceList(petsitterId)));
            res.Add("PetsitterPets", _service.ConvertDataTable(_Petsitterdata.GetUserPets(petsitterId)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetPetsitterReviews(string petsitterId)
    {

        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("PetsitterReviews", _service.ConvertDataTable(_Petsitterdata.GetPetsitterReviews(petsitterId)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertReview(string UserId, string PetsitterId, string Rate, string ReviewText, string Timestamp)
    {

        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            int row = _Petsitterdata.InsertReview(UserId, PetsitterId, Rate, ReviewText, Timestamp);
            if (row > 0)

                res.Add("PetsitterReviews", _service.ConvertDataTable(_Petsitterdata.GetPetsitterReviews(PetsitterId)));
            else
            res.Add("PetsitterReviews", row);
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertProfilePicture(string UserId, string Image, string imageName)
    {
        try
        {
            Dictionary<string, object> res = new Dictionary<string, object>();
            string imageNameCombo = UserId + "_Profile_" + imageName;
            bool imageSaved = ImageData.SaveImage(Image, imageNameCombo, @"images/");
            if (imageSaved)
            {
                res = _service.CreateSuccessRes();
                res.Add("ProfilePicture", _service.ConvertDataTable(_Petsitterdata.InsertProfilePicture(UserId, IMG_PREFIX + imageNameCombo)));
            }
            else {
                Exception ex = new Exception("Image didnt save");
                res = _service.CreateErrorRes(ex);
            }
            
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    public string GiveAllServices()
    {

        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Services", _service.ConvertDataTable(_Petsitterdata.GiveAllServices()));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }
  

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdatePriceForService(int PetSitterId, int ServiceId, int Price)
    {

        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("PriceList", _service.ConvertDataTable(_Petsitterdata.UpdatePriceForService(PetSitterId, ServiceId, Price)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdatePetList(string PetName, int PetGender, int UserId,int TypeId,int SizeId,string ImgPath, string Description, string imageName)
    {
        try
        {
            Dictionary<string, object> res = new Dictionary<string, object>();
            if (ImgPath != "null")
            {
                string imageNameCombo = UserId + "_Pet_" + PetName + "_" + imageName;
                bool imageSaved = ImageData.SaveImage(ImgPath, imageNameCombo, @"images/");
                if (imageSaved)
                {
                    res = _service.CreateSuccessRes();
                    res.Add("petList", _Petsitterdata.UpdatePetList(PetName, PetGender, UserId, TypeId, SizeId, IMG_PREFIX + imageNameCombo, Description));
                }
                else
                {
                    Exception ex = new Exception("Image didnt save");
                    res = _service.CreateErrorRes(ex);
                }
                return _js.Serialize(res);
            }
            else {
                res = _service.CreateSuccessRes();
                res.Add("petList", _Petsitterdata.UpdatePetList(PetName, PetGender, UserId, TypeId, SizeId, ImgPath, Description));
                return _js.Serialize(res);
            }


        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }



   [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdatePetsitterVisable(int PetsitterId, string IsVisable)
    {

        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("visability",_Petsitterdata.UpdatePetsitterVisable(PetsitterId, IsVisable));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetUserEvents(int loginId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Events", _service.ConvertDataTable(_Petsitterdata.GetAllPetsitterEvents(loginId)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetUserEventsByDate(int loginId, string dayClicked)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Events", _service.ConvertDataTable(_Petsitterdata.GetUserEventsByDate(loginId, dayClicked)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateCity(int userId,string cityName, string streetName,string houseNumber)
    {  
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("visability", _Petsitterdata.UpdateCity(userId, cityName, streetName, houseNumber));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string Favorite(string userId, string petsitterId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("visability", _Petsitterdata.Favorite(userId, petsitterId));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertEvent(string userId, string petsitterId, string serviceId, string startD, string endD, string startT, string EndT)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("InsertEvent", _Petsitterdata.InsertEvent(userId, petsitterId, serviceId, startD, endD, startT, EndT));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

}
