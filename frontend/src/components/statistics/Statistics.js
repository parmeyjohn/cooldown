import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { JournalContext } from "../../contexts/JournalContext";
import { EntryContext } from "../../contexts/EntryContext";

const Statistics = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setEntries, currEntry, setCurrEntry } = useContext(EntryContext);
  const { currJournal, setCurrJournal, setJournals } =
    useContext(JournalContext);
    
    // {
    //     "entryTitle": "New Childish Gambino Album",
    //     "mediaTitle": "",
    //     "mediaObj": {
    //         "id": "4yUqNSK6jMi7Y6eWl03U5r",
    //         "img": "https://i.scdn.co/image/ab67616d0000b27305c9a49574cc249f1c5405ab",
    //         "audioType": "album",
    //         "title": "Bando Stone and The New World",
    //         "year": "2024",
    //         "genre": ""
    //     },
    //     "startDate": "2024-08-09T19:31:20.337Z",
    //     "content": {
    //         "ops": [
    //             {
    //                 "insert": "I thought it was good\n"
    //             }
    //         ]
    //     },
    //     "text": "I thought it was good\n",
    //     "tags": [
    //         "hip hop",
    //         "music"
    //     ],
    //     "journalId": "66b6d0f68e87a6a98b89707c",
    //     "id": "66b6d1148e87a6a98b89707f"
    // }

    // {
    //     "entryTitle": "Spider-Verse",
    //     "mediaTitle": "",
    //     "mediaObj": {
    //         "id": "tt4633694",
    //         "img": "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg",
    //         "filmType": "movie",
    //         "title": "Spider-Man: Into the Spider-Verse",
    //         "year": "2018",
    //         "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    //         "genre": [
    //             "Animation",
    //             "Action",
    //             "Adventure"
    //         ]
    //     },
    //     "startDate": "2024-05-21T11:16:51.795Z",
    //     "content": {
    //         "ops": [
    //             {
    //                 "insert": "Great movie, 10/10 characters and story; probably the best spider-man movie they've ever made.\n"
    //             }
    //         ]
    //     },
    //     "text": "Great movie, 10/10 characters and story; probably the best spider-man movie they've ever made.\n",
    //     "tags": [
    //         "3d",
    //         "spider-man"
    //     ],
    //     "journalId": "661e35e617b27ba7ebd36ca6",
    //     "id": "664ce56d84313a97061ea7c0"
    // }


    // {
    //     "entryTitle": "Legend of Zelda",
    //     "mediaTitle": "",
    //     "mediaObj": {
    //         "img": "https://cdn.mobygames.com/covers/4756691-the-legend-of-zelda-ocarina-of-time-nintendo-64-front-cover.jpg",
    //         "thumbnailImg": "https://cdn.mobygames.com/d4e20cc8-abbf-11ed-8048-02420a000198.webp",
    //         "id": 3549,
    //         "title": "The Legend of Zelda: Ocarina of Time",
    //         "genres": [
    //             [
    //                 "Action",
    //                 "1st-person",
    //                 "Behind view",
    //                 "Metroidvania",
    //                 "Puzzle elements",
    //                 "Direct control",
    //                 "Fantasy",
    //                 "Medieval"
    //             ]
    //         ]
    //     },
    //     "startDate": "2024-08-09T19:34:16.271Z",
    //     "content": {
    //         "ops": [
    //             {
    //                 "insert": "It is a classic\n"
    //             }
    //         ]
    //     },
    //     "text": "It is a classic\n",
    //     "tags": [
    //         "n64",
    //         "zelda"
    //     ],
    //     "journalId": "66b57a69a4ab1709f96eea0d",
    //     "id": "66b6d1c38e87a6a98b897082"
    // }
  
    // {
    //     "entryTitle": "Dune",
    //     "mediaTitle": "",
    //     "mediaObj": {
    //         "img": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE727VmyWULLY0ofd0AXWubwvlVUUc4ebyRTsiEn5cK2EhztVfDWtewFHukvG1slx3Q4oQXDygnprrtDWTlvudCjrY5rGWcg8YyjL8YD068ZFM3AWuUbt4NbNi6MgKL0Vh5y3Mpb4&source=gbs_api",
    //         "thumbnailImg": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE722v5wQy8Hqteni0DkpuVZBhyoFBCwiyeJdKli3BvvcXn_2imG8E4vkPKfS2tOfmuobSXj5nLqZaie5-2gXSaSd3eBeFIywRlweeFif0vMl1gKF9At3TJq0iWFJ5MiM3hJjsZQh&source=gbs_api",
    //         "id": "hOy3EAAAQBAJ",
    //         "title": "Dune (Movie Tie-In)",
    //         "pageCount": 705,
    //         "author": {
    //             "title": "Dune (Movie Tie-In)",
    //             "authors": [
    //                 "Frank Herbert"
    //             ],
    //             "publisher": "Penguin",
    //             "publishedDate": "2023-09-26",
    //             "description": "<b><b>• DUNE: PART TWO • </b>THE MAJOR MOTION PICTURE<br></b>Directed by Denis Villeneuve, screenplay by Denis Villeneuve and Jon Spaihts, based on the novel <i>Dune</i> by Frank Herbert • Starring Timothée Chalamet, Zendaya, Rebecca Ferguson, Josh Brolin, Austin Butler, Florence Pugh, Dave Bautista, Christopher Walken, Léa Seydoux, with Stellan Skarsgård, with Charlotte Rampling, and Javier Bardem<b><br><br>Frank Herbert’s classic masterpiece—a triumph of the imagination and one of the bestselling science fiction novels of all time.</b><br><br>Set on the desert planet Arrakis, <i>Dune</i> is the story of Paul Atreides−who would become known as Maud'Dib—and of a great family's ambition to bring to fruition humankind’s most ancient and unattainable dream. <br><br>A stunning blend of adventure and mysticism, environmentalism and politics, <i>Dune</i> won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.",
    //             "industryIdentifiers": [
    //                 {
    //                     "type": "ISBN_10",
    //                     "identifier": "0593640330"
    //                 },
    //                 {
    //                     "type": "ISBN_13",
    //                     "identifier": "9780593640333"
    //                 }
    //             ],
    //             "readingModes": {
    //                 "text": false,
    //                 "image": false
    //             },
    //             "pageCount": 704,
    //             "printedPageCount": 705,
    //             "dimensions": {
    //                 "height": "21.00 cm",
    //                 "width": "14.00 cm",
    //                 "thickness": "2.90 cm"
    //             },
    //             "printType": "BOOK",
    //             "categories": [
    //                 "Fiction / Media Tie-In",
    //                 "Fiction / Science Fiction / Space Opera",
    //                 "Fiction / Classics"
    //             ],
    //             "maturityRating": "NOT_MATURE",
    //             "allowAnonLogging": false,
    //             "contentVersion": "1.1.1.0.preview.0",
    //             "panelizationSummary": {
    //                 "containsEpubBubbles": false,
    //                 "containsImageBubbles": false
    //             },
    //             "imageLinks": {
    //                 "smallThumbnail": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70weuXwK96n4UVU-4P6w8MmerWd5jleSgKDXuOqCIpXfC-G92QrI9tPh6QFR95UQ3A0TBZ6k7yBlXvY3ZHkB2RTbYNZqTAxsavhhzh_xPCvfxWNcgf8QZoUFMOJmwk4Vi4Z3jmL&source=gbs_api",
    //                 "thumbnail": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE722v5wQy8Hqteni0DkpuVZBhyoFBCwiyeJdKli3BvvcXn_2imG8E4vkPKfS2tOfmuobSXj5nLqZaie5-2gXSaSd3eBeFIywRlweeFif0vMl1gKF9At3TJq0iWFJ5MiM3hJjsZQh&source=gbs_api",
    //                 "small": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE73WMn2tJYkVSx7ViXm4RG3FocdzbY81utzq35UVdQWJoFNC8aWbMJ49gRfPLbb952YeZlGVFTEmq7YwrEyIx8cPHDoXqpOD-JzJvQsZkydZboq7xVQsHkm-oAAhoSFdyduUS8OK&source=gbs_api",
    //                 "medium": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE727VmyWULLY0ofd0AXWubwvlVUUc4ebyRTsiEn5cK2EhztVfDWtewFHukvG1slx3Q4oQXDygnprrtDWTlvudCjrY5rGWcg8YyjL8YD068ZFM3AWuUbt4NbNi6MgKL0Vh5y3Mpb4&source=gbs_api",
    //                 "large": "http://books.google.com/books/publisher/content?id=hOy3EAAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE71y-Sd32PUfMpt9pyePD5xE1UWQouF8Qs2NgOl1NQ5cxhnX-QkXG7waDIWpNyHD7uR2mKerKj6dlHPbXjovh8NPeZQhTMmStW64DaExvOna-cMwdbuz-w0WMD8unIgKF18GXGrs&source=gbs_api"
    //             },
    //             "language": "en",
    //             "previewLink": "http://books.google.com/books?id=hOy3EAAAQBAJ&hl=&source=gbs_api",
    //             "infoLink": "https://play.google.com/store/books/details?id=hOy3EAAAQBAJ&source=gbs_api",
    //             "canonicalVolumeLink": "https://play.google.com/store/books/details?id=hOy3EAAAQBAJ"
    //         }
    //     },
    //     "startDate": "2024-08-09T19:38:43.170Z",
    //     "content": {
    //         "ops": [
    //             {
    //                 "insert": "It was a little long but a classic\t\t\n"
    //             }
    //         ]
    //     },
    //     "text": "It was a little long but a classic\t\t\n",
    //     "tags": [
    //         "dune",
    //         "Sci-fi"
    //     ],
    //     "journalId": "66b6d2ac8e87a6a98b897086",
    //     "id": "66b6d2c98e87a6a98b897089"
    // }
  
    const testEntries = [
    [
      {
        entryTitle: "title",
        mediaTitle: "mario odyssey",
        mediaType: "game",
        genre: "action",
        platform: "Nintendo Switch",
        date: "01,01,2020",
        duration: "2hrs",
        tags: ["mario", "platformer"],
        sentiment: "positive",
        journalId: "645df69a1044f1c1ef3eb99d",
        id: "6503d2b9ea0cafc0c91d633c",
        text: "text",
      },
    ],
  ];
  return (
    <div className="relative z-20 mx-auto flex h-auto max-h-screen min-h-screen w-full max-w-7xl flex-col justify-between rounded-2xl border-b-8 border-slate-600 bg-teal-50 md:static md:my-8 md:h-auto lg:static">
      <div className="flex w-full items-center justify-between px-4 py-6"></div>
    </div>
  );
};

export default Statistics;
