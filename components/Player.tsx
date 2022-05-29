import { useCallback, useEffect, useRef, useState, memo } from "react";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
  RangeSliderTrack,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { Song } from "@prisma/client";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";
import { StoreModel } from "../lib/store";

const Player = ({ songs, activeSong }: { songs: Song[]; activeSong: Song }) => {
  const soundRef = useRef<ReactHowler>(null);
  const repeatRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const changeActiveSong = useStoreActions<StoreModel>(
    (state) => state.changeActiveSong
  );

  const togglePlaying = useCallback(() => {
    setPlaying((state) => !state);
  }, []);
  const toggleShuffle = useCallback(() => {
    setShuffle((state) => !state);
  }, []);
  const toggleRepeat = useCallback(() => {
    setRepeat((state) => !state);
  }, []);
  const prevSong = useCallback(() => {
    setIndex((state) => (state ? state - 1 : songs.length - 1));
  }, [songs]);
  const setIsSeekingFalse = useCallback(() => {
    setIsSeeking(false);
  }, []);
  const setIsSeekingTrue = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const nextSong = useCallback(() => {
    setIndex((state) => {
      if (shuffle) {
        let next;
        do {
          next = Math.floor(Math.random() * songs.length);
        } while (next === state);

        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  }, [shuffle, songs.length]);

  const onSongEnd = useCallback(() => {
    if (repeatRef.current) {
      soundRef.current.seek(0);
      setSeek(0);
    } else {
      nextSong();
    }
  }, [nextSong]);

  const onSongLoad = useCallback(() => {
    const songDuration = +soundRef.current.duration().toFixed(2);
    setDuration(songDuration);
  }, []);

  const onSongSeek = useCallback(
    ([time]: [number]) => {
      const timeOffset = 1;
      if (time < seek + timeOffset && time > seek - timeOffset) {
        return;
      }

      setSeek(time);
      soundRef.current.seek(time);
    },
    [seek]
  );

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => {
        cancelAnimationFrame(timerId);
      };
    }

    cancelAnimationFrame(timerId);
  }, [isSeeking, playing]);

  useEffect(() => {
    const correctIndex = songs.findIndex((s) => s.id === activeSong.id);

    if (correctIndex !== index) {
      setIndex(correctIndex);
    } else if (activeSong.id !== songs[index].id) {
      changeActiveSong(songs[index]);
    }
  }, [activeSong.id, changeActiveSong, index, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  return (
    <Box>
      <Box color="gray.600">
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onSongLoad}
          onEnd={onSongEnd}
        />
        <Center>
          <ButtonGroup>
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              fontSize="x-large"
              color={shuffle ? "white" : ""}
              onClick={toggleShuffle}
              icon={<MdShuffle />}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="skip"
              fontSize="x-large"
              icon={<MdSkipPrevious />}
              onClick={prevSong}
            />
            {playing ? (
              <IconButton
                outline="none"
                variant="link"
                aria-label="pause"
                fontSize="5xl"
                color="white"
                icon={<MdOutlinePauseCircleFilled />}
                onClick={togglePlaying}
              />
            ) : (
              <IconButton
                outline="none"
                variant="link"
                aria-label="play"
                fontSize="5xl"
                color="white"
                icon={<MdOutlinePlayCircleFilled />}
                onClick={togglePlaying}
              />
            )}

            <IconButton
              outline="none"
              variant="link"
              aria-label="next"
              fontSize="x-large"
              icon={<MdSkipNext />}
              onClick={nextSong}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="repeat"
              fontSize="x-large"
              color={repeat ? "white" : ""}
              icon={<MdOutlineRepeat />}
              onClick={toggleRepeat}
            />
          </ButtonGroup>
        </Center>
        <Flex justify="center" align="center">
          <Box mr="4">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Flex flexGrow="1" justify="center" align="center">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChange={onSongSeek}
              onChangeStart={setIsSeekingTrue}
              onChangeEnd={setIsSeekingFalse}
              value={[seek]}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Flex>
          <Box ml="4">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default memo(Player);
