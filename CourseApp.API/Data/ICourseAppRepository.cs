using System.Collections.Generic;
using System.Threading.Tasks;
using CourseApp.API.Models;

namespace CourseApp.API.Data
{
    public interface ICourseAppRepository
    {
         void Add<T>(T entity) where T: class;
        //  Adding a type of T (which can be user or photo), restricting to T having to be a class
        // Saves writing extra code for an add method for user and photo
        // 'T entity' is the parameter which will be the user or photo

        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}