using System.Linq;
using AutoMapper;
using CourseApp.API.Dtos;
using CourseApp.API.Models;

namespace CourseApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // AutoMapper doesn't require any configuration in regards to which properties match to which providing that those properties are given the same name
            // PhotoUrl isn't one of those properties

            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.)
                });
            // dest is short for destination as PhotoURL is a property in the UserForListDto
            // opt is short for options. Map from is where you specify where to get the property from
            // This then looks through all properties for the photo property, then gets the first item which is tagged as the IsMain photo item
            // because Photos is a list of Photos and finally returns the url for it
            // Use ResolveUsing when not mapping between 2 properties. Age doesn't have a property in User and needs to be calculated
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                });
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}