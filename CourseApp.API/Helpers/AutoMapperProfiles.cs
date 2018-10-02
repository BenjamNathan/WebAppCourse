using AutoMapper;
using CourseApp.API.Dtos;
using CourseApp.API.Models;

namespace CourseApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailedDto>();
            // AutoMapper doesn't require any configuration in regards to which properties match to which providing that those properties are given the same name
        }
    }
}