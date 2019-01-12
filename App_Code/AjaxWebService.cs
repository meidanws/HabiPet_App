//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Services;
////Added this...
//using System.Web.Script.Serialization;
//using System.Web.Script.Services;

///// <summary>
///// Summary description for AjaxWebService
///// </summary>
//[WebService(Namespace = "http://tempuri.org/")]
//[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
//[System.Web.Script.Services.ScriptService]
//public class AjaxWebService : System.Web.Services.WebService
//{

//    public AjaxWebService()
//    {

//        //Uncomment the following line if using designed components 
//        //InitializeComponent(); 
//    }

//    [WebMethod]
//    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

//    public string GetAnimalType()
//    {
//        Animal animal = new Animal();
//        List<Animal> ls = animal.GetAnimalsType();
//        JavaScriptSerializer js = new JavaScriptSerializer();        
//        string jsonStringAnimalsType = js.Serialize(ls);
//        return jsonStringAnimalsType;
                 
//    }


//    [WebMethod]
//    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

//    public string getDogSizes()
//    {
//        Size dogssizes = new Size();
//        List<Size> newls = dogssizes.GetAllAnimalsSize();
//        JavaScriptSerializer js = new JavaScriptSerializer();
//        string jsonStringAnimalSizes = js.Serialize(newls);
//        return jsonStringAnimalSizes;
//    }


//    [WebMethod]
//    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

//    public string getServiceTypes()
//    {
//        Service serv = new Service();
//        List<Service> newls = serv.GetAllService();
//        JavaScriptSerializer js = new JavaScriptSerializer();
//        string jsonStringAnimalSizes = js.Serialize(newls);
//        return jsonStringAnimalSizes;
//    }

//}
