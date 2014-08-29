using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FizzWare.NBuilder;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using NLog;
using Train.Models;


namespace Train.Controllers
{
    public class GridController : Controller
    {
        //
        // GET: /Grid/

        private static Logger _Logger = LogManager.GetCurrentClassLogger();


        public ActionResult Persist()
        {
            var model = new VehicleStatusViewModel();
            
            return View(model);
        }

        public ActionResult Filter()
        {
            var model = new VehicleStatusViewModel()
            {
                VehicleTypes = GetVehicleTypes()
            };
            return View(model);
        }

        public ActionResult GetAllVehicles([DataSourceRequest]DataSourceRequest request)
        {
            var list = DataGenerator.GenerateVehicles();
            var result = list.ToDataSourceResult(request);
            return Json(result);
        }

        public void SaveState(string gridState)
        {
            Session["GridVehicleState"] = gridState;
            _Logger.Debug("Saved Grid State: " + gridState);
        }

        public string LoadState()
        {
            _Logger.Debug("Returned Grid State: " + (string)Session["GridVehicleState"]);
            return (string)Session["GridVehicleState"];
        }

        public ActionResult _LoadLocations()
        {
            var locationList = DataGenerator.GenerateVehicles().Select(v => new { Id = v.Location, Value = v.Location }).Distinct();
            return Json(locationList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult _LoadVehicleTypes()
        {
            var locationList = DataGenerator.GenerateVehicles().Select(v => new { Id = v.VehicleType, Value = v.VehicleType }).Distinct();
            return Json(locationList, JsonRequestBehavior.AllowGet);
        }

        private List<NameValueDto> GetVehicleTypes()
        {
            var locationList = DataGenerator.GenerateVehicles().Select(v => new { Id = v.VehicleType,Value = v.VehicleType }).Distinct();
            return locationList.Select(v => new NameValueDto() { Id = v.Id, Value = v.Value }).ToList();
        }
       
    }
}
