using System.Collections.Generic;
using System.Threading.Tasks;
using CourseApp.API.Helpers;
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
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}