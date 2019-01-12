using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Summary description for AnimalAPI
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AnimalAPI : System.Web.Services.WebService
{
    private readonly Service _service;
    private readonly JavaScriptSerializer _js;
    private readonly AnimalData _animalData;

    public AnimalAPI()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetAnimalTypes()
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Animal", _service.ConvertDataTable(_animalData.GetAnimalType()));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

}
