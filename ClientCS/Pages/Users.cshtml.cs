using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using ClientC_.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace ClientC_.Pages
{
    public class UsersModel : PageModel
    {
        public IList<UserViewModel> users;
        private HttpClient client;
        
        public UsersModel()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://127.0.0.1:5000/");
            users = new List<UserViewModel>();
        }

        public async Task OnGetAsync()
        {
            string action = HttpContext.Request.Query["action"];
            if (!String.IsNullOrEmpty(action) && action == "deletar") 
            {
                string name = HttpContext.Request.Query["name"];
                var response = client.DeleteAsync("/users/"+name).Result; 
                if (response.IsSuccessStatusCode)
                {
                    Response.Redirect("/Users");
                }
            }
            else
            {
                HttpResponseMessage response = await client.GetAsync("users/");
                if (response.IsSuccessStatusCode)
                {
                    var resp = await response.Content.ReadAsStringAsync();
                    users = JsonConvert.DeserializeObject<List<UserViewModel>>(resp);
                }
            }
        }
    }
}
