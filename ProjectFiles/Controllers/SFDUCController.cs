using System;
using System.Web.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using DavesGamesMVC.Models;

namespace DavesGamesMVC.Controllers
{
    public class SFDUCController : Controller
    {

        const string StorageAccountName = "davidsmainstorageaccount";
        const string StorageAccountKey = "khl01c+Gf53h2CmjQZ5yyGJSxsf9ao4yEBoQBCTuo5Z+pVVW5Fz3WGVeKMd8IEcrJLaMuPDK0rQFKbl9BpUsKg==";

        // GET: SliderForDevs

        [HttpPost]        
        public ActionResult Index(SFDModel form)
        {
            var storageCredentials = new StorageCredentials(StorageAccountName, StorageAccountKey);
            var storageAccount = new CloudStorageAccount(storageCredentials, true);
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("movescripts");


            string guid = Guid.NewGuid().ToString();
            string name = String.Format("{0}.js", guid);

            var blob = container.GetBlockBlobReference(name);
            blob.UploadFromStream(form.fileInput.InputStream);


            ViewBag.Title = "Slider For Devs";
            ViewBag.CSS = "~/Content/SFD.css";
            ViewBag.JS = "~/Scripts/SFD.js";
            ViewBag.MoveJS = "~/Scripts/Move.js";
            ViewBag.GridString = form.gridString;
            ViewBag.AboutDisplayStatus = form.aboutDisplayStatus;
            ViewBag.MoveJS = blob.Uri.AbsoluteUri;

            // in shared folder
            return View("SFD");
        }



    }
}