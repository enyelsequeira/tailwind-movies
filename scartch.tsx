
        <div>
          <Typography as="h3">Overview </Typography>
          <Typography as="p" resetStyles className="text-left md:text-justify text-xl font-body line-clamp-4 hover:line-clamp-none transition-all duration-200 ease-in cursor-pointer"> {isMovie ? data.overview : shows.overview}</Typography>
        </div>
        {/* rating and buttons */}
        <div className="flex flex-between space-x-16  md:space-x-48 ">
          <div>
            <Typography as="h3" className="my-2">Rating</Typography>
            <Circle animate={true} animationDuration="2s" responsive={false} size="100" lineWidth="40" progress={isMovie ? data.vote_average * 10 : shows.vote_average * 10} progressColor="rgba(36, 101, 187, 0.747)" bgColor="#ecedf0" textColor="#6b778c" textStyle={{
              font: 'bold 4rem Source Sans Pro, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
            }}
              percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
              roundedStroke={false} // Boolean: Rounded/Flat line ends
              showPercentage={true} // Boolean: Show/hide percentage.
              showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
            />
          </div>
          <div className="flex flex-col justify-end space-y-8">
            <Button variant="primary">
              <Typography>Favorite</Typography>
              <MdFavoriteBorder />
            </Button>
            <Button variant="primary">
              <Typography>WatchList</Typography>
              <MdWatchLater />
            </Button>
          </div>

        </div>
        <div>
          <Typography as="h3" className="my-2">Genres</Typography>
          <div className="flex space-x-4">
            {isMovie ? data?.genres.map((genre) => {
              return (
                <Link href="/" passHref key={genre.id} >
                  <a onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                    <Typography as="p" className="hover:text-red-400 dark:hover:text-red-200" > {genre.name} </Typography>
                  </a>

                </Link>
              )

            }) : shows?.genres.map((genre) => {
              return (
                <Link href="/" passHref key={genre.id} >
                  <a onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                    <Typography as="p" className="hover:text-red-400 dark:hover:text-red-200" > {genre.name} </Typography>
                  </a>

                </Link>
              )

            })}
          </div>

        </div>

        {/* cast */}
        <div>
          <Typography as="h3" className="my-2">Cast</Typography>
          <div className="grid grid-cols-3  gap-3 md:grid md:grid-cols-5  py-1">
            {isMovie ? data.credits.cast.slice(0, 5).map((actor: Cast) => {
              return (
                <div key={actor.id} className="flex flex-col">
                  <div className="relative h-28 md:h-32">
                    <Image className="rounded-md h-36" src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor?.profile_path}` : "/images/placeholder.jpeg"} alt={actor.name} objectFit="cover" layout="fill" />
                  </div>
                  <Link href={`/cast/${actor.id}`}>
                    <a>
                      <Typography as="p" resetStyles className="truncate text-center hover:text-red-400 dark:hover:text-red-200"> {actor.name} </Typography>
                    </a>
                  </Link>


                </div>
              )
            }) : shows.credits.cast.slice(0, 5).map((actor: Cast) => {
              return (
                <div key={actor.id} className="flex flex-col">
                  <div className="relative h-28 md:h-32">
                    <Image className="rounded-md h-36" src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} alt={actor.name} objectFit="cover" layout="fill" />
                  </div>
                  <Link href={`/cast/${actor.id}`}>
                    <a>
                      <Typography as="p" resetStyles className="truncate text-center hover:text-red-400 dark:hover:text-red-200"> {actor.name} </Typography>
                    </a>
                  </Link>


                </div>
              )
            })}
          </div>

        </div>



        <div className="flex flex-row gap-1 flex-wrap lg:flex-row justify-between items-baseline  my-2" >
          <div className="flex rounded-lg flex-row justify-between text-lg gap-1" role="group">
            {isMovie && <a target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data.imdb_id}`}>
              <Button variant="primary">
                <Typography>IMDB</Typography>
                <FaImdb />
              </Button>
            </a>}

            <a target="_blank" rel="noopener noreferrer" href={`${isMovie ? data?.homepage : shows.homepage}`}>
              <Button variant="primary">
                <Typography>Website</Typography>
                < FaExternalLinkAlt />
              </Button>
            </a>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <Typography>Trailer</Typography>
              < FaPlay />
            </Button>
          </div>

          {/* back btn */}
          <Button variant="secondary" onClick={() => router.push("/")}>
            &larr; Back
          </Button>

        </div>

        {data && isModalOpen && <Modal open={isModalOpen} title={isMovie ? data.title : shows.name} video={isMovie ? data.videos.results[0].key : shows.videos.results[0].key} setOpen={setIsModalOpen} />}


