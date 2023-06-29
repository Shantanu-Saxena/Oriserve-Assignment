import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Box, CircularProgress, Modal } from "@mui/material";
import "./ImageList.css";

function ImageList({ searchText, searchHistoryList, setSearchHistoryList }) {
  const [imageLinksList, setImageLinksList] = useState([]);
  const [open, setOpen] = useState(false);
  const [popUpImage, setPopUpImage] = useState("");
  const [lodading, setLoading] = useState(true);
  const apiKey = "96a6aae335a2254c4682787a3a1dc978";
  const queryParamData = {
    method: "flickr.photos.getRecent",
    api_key: apiKey,
    format: "json",
    nojsoncallback: 1,
    safe_search: 1,
  };

  const openModal = (link) => {
    setOpen(true);
    setPopUpImage(link);
  };
  const closeModal = () => setOpen(false);

  const getFlickrImageURL = (photo) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    url += ".jpg";
    return url;
  };

  const fetchData = debounce(async () => {
    if (searchText) {
      queryParamData.method = "flickr.photos.search";
      queryParamData.text = searchText;
    }
    const params = new URLSearchParams(queryParamData);
    const url = `https://www.flickr.com/services/rest/?${params}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setImageLinksList(
        data.photos.photo.map((photo) => getFlickrImageURL(photo))
      );
      if (searchText) {
        let redundant = false;
        searchHistoryList.map((res) => {
          if (res.toLowerCase() === searchText.toLowerCase()) redundant = true;
        });
        if (!redundant) {
          const tempSearchHistoryList = [...searchHistoryList, searchText];
          setSearchHistoryList(tempSearchHistoryList);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(tempSearchHistoryList)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, 800);

  useEffect(() => {
    setLoading(true);
    fetchData();
    return () => {
      fetchData.cancel();
    };
  }, [searchText]);

  return (
    <>
      {lodading ? (
        <CircularProgress style={{ marginTop: "140px" }} />
      ) : (
        <>
          <div className="listContainer">
            {!imageLinksList.length ? (
              <h2>No result found</h2>
            ) : (
              imageLinksList.map((res, index) => (
                <img
                  className="ImageCell"
                  key={index}
                  src={res}
                  onClick={() => openModal(res)}
                  alt="no preview"
                />
              ))
            )}
          </div>

          <Modal open={open} onClose={closeModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <img
                src={popUpImage}
                style={{ width: "100%" }}
                alt="no-preview"
              />
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default ImageList;
