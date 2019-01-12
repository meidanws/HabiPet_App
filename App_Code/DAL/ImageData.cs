using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ImageData
/// </summary>
public class ImageData
{
    public ImageData()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public static bool SaveImage(string base64, string name, string path)
    {
        try
        {
            bool IsExists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath("../" + path));
            if (!IsExists)
                System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("../" + path));

            string fullPath = HttpContext.Current.Server.MapPath("../" + path);

            System.Drawing.Image newImage;
            if (!File.Exists(HttpContext.Current.Server.MapPath("../" + path) + name))
            {
                string b = string.Empty;
                if (base64.Split(',')[0].IndexOf("jpeg") != -1)
                 b = base64.Split(new string[] { "data:image/jpeg;base64," }, StringSplitOptions.None)[1].Replace(" ", "+");
                else
                    b = base64.Split(new string[] { "data:image/png;base64," }, StringSplitOptions.None)[1].Replace(" ", "+");
                byte[] imgTmp = Convert.FromBase64String(b);
                MemoryStream ms = new MemoryStream(imgTmp);
                newImage = System.Drawing.Image.FromStream(ms);
                newImage.Save(fullPath + name);
            }
            else
            {
                File.Delete(fullPath + name);
                byte[] imgTmp = Convert.FromBase64String(base64);
                MemoryStream ms = new MemoryStream(imgTmp);
                newImage = System.Drawing.Image.FromStream(ms);
                newImage.Save(fullPath + name);
            }

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }

    }
}