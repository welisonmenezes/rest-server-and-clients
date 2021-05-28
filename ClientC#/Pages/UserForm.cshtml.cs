using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ClientC_.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace ClientC_.Pages
{
    public class UserFormModel : PageModel
    {
        public UserViewModel user;
        public string NameAttr { get; set; } = "";
        public string Title { get; set; } = "Cadastrar Usuário";
        public string Action { get; set; } = "cadastrar";
        public bool IsEdit { get; set; } = false;
        private HttpClient client;

        public UserFormModel()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://127.0.0.1:5000/");
            user = new UserViewModel();
        }

        public async Task OnGetAsync()
        {
            string name = HttpContext.Request.Query["name"];
            if (!String.IsNullOrEmpty(name))
            {
                HttpResponseMessage response = await client.GetAsync("users/"+name);
                if (response.IsSuccessStatusCode)
                {
                    var resp = await response.Content.ReadAsStringAsync();
                    user = JsonConvert.DeserializeObject<UserViewModel>(resp);
                    IsEdit = true;
                    NameAttr = "readonly";
                    Title = "Editar Usuário";
                    Action = "editar";
                }
            }
        }

        public void OnPost()
        {
            if (!String.IsNullOrEmpty(Request.Form["action"]))
            {
                UserViewModel theUser = new UserViewModel {
                    nome = Request.Form["name"],
                    idade = Request.Form["age"],
                    ocupacao = Request.Form["role"]
                };

                var json = Newtonsoft.Json.JsonConvert.SerializeObject(theUser);
                var dataToSend = new System.Net.Http.StringContent(json, Encoding.UTF8, "application/json");

                if (Request.Form["action"] == "editar")
                {
                    var response = client.PutAsync("/users/"+Request.Form["name"], dataToSend).Result; 
                    if (response.IsSuccessStatusCode)
                    {
                        Response.Redirect("/Users");
                    }
                }
                else
                {
                    var response = client.PostAsync("/users/"+Request.Form["name"], dataToSend).Result; 
                    if (response.IsSuccessStatusCode)
                    {
                        Response.Redirect("/Users");
                    }
                }
            }
        }
    }
}
