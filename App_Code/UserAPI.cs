using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Summary description for UserAPI
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UserAPI : System.Web.Services.WebService
{
    private readonly Service _service;
    private readonly JavaScriptSerializer _js;
    private readonly UserData _userData;
    private readonly MessageData _messageData;
    private readonly PetsitterData _petsitterdata;

    public UserAPI()
    {
        _service = new Service();
        _js = new JavaScriptSerializer();
        _userData = new UserData();
        _messageData = new MessageData();
        _petsitterdata = new PetsitterData();
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetUserDetails(int userId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("User", _service.ConvertDataTable(_userData.GetUserDetailsById(userId)));
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
    public string GetAllUsers()
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("User", _service.ConvertDataTable(_userData.GetAllUsers()));
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
    public string CheckUser(string email, string password)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("User", _service.ConvertDataTable(_userData.CheckUser(email, password)));
            res.Add("PetsitterPriceList", _service.ConvertDataTable(_petsitterdata.GetPetsitterPriceList("1")));
            res.Add("PetsitterPets", _service.ConvertDataTable(_petsitterdata.GetUserPets("1")));
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
    public string AddUser(string name, string lastName,string email, string password)
    { 
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("User", _service.ConvertDataTable(_userData.AddUser(name, lastName, email, password)));
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
    public string GetChat(string loginId, string chatUser)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("chatUser", _service.ConvertDataTable(_userData.GetUserDetailsById(int.Parse(chatUser)))[0]);
            res.Add("Massages", _service.ConvertDataTable(_messageData.GetChat(int.Parse(loginId), int.Parse(chatUser))));
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
    public string GetUserServiceOnAir(string loginId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Events", _service.ConvertDataTable(_userData.GetUserServiceOnAir(loginId)));
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
    public string GetMessages(int UserId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Inbox", _service.ConvertDataTable(_userData.GetMessages(UserId)));
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
    public string GetFavoritesList(int UserId)
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Favorites", _service.ConvertDataTable(_userData.GetFavoritesList(UserId)));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }
}
