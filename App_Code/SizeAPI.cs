using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for SizeAPI
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SizeAPI : System.Web.Services.WebService
{
    private readonly Service _service;
    private readonly JavaScriptSerializer _js;
    private readonly SizeData _sizeData;

    public SizeAPI()
    {

        _service = new Service();
        _js = new JavaScriptSerializer();
        _sizeData = new SizeData();
    }

    public string GetAllSize()
    {
        try
        {
            Dictionary<string, object> res = _service.CreateSuccessRes();
            res.Add("Size", _service.ConvertDataTable(_sizeData.GetAllSize()));
            return _js.Serialize(res);
        }
        catch (Exception ex)
        {
            Dictionary<string, object> res = _service.CreateErrorRes(ex);
            return _js.Serialize(res);
        }
    }

}
