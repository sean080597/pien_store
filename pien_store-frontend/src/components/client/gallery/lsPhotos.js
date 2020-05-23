const lsPhotos = [
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/01.c62ad7d5.jpg",
      width: 3,
      height: 2,
      title: 'Title 8',
      key: '235235'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/02.6851c6ee.jpg",
      width: 3,
      height: 2,
      title: 'Title 9',
      key: '2363643'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/03.d2e9a990.jpg",
      width: 3,
      height: 2,
      title: 'Title 1',
      key: '1124214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/04.4811168f.jpg",
      width: 3,
      height: 2,
      title: 'Title 2',
      key: '22422222'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/05.7364be44.jpg",
      width: 8,
      height: 5,
      title: 'Title 3',
      key: '3334214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/06.b2c9ff85.jpg",
      width: 3,
      height: 2,
      title: 'Title 4',
      key: '4424214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/07.a54820e6.jpg",
      width: 8,
      height: 5,
      title: 'Title 5',
      key: '5524214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/08.286acff1.jpg",
      width: 3,
      height: 2,
      title: 'Title 6',
      key: '6624214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/09.663ecdfb.jpg",
      width: 3,
      height: 2,
      title: 'Title 7',
      key: '7724214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/10.558a8794.jpg",
      width: 3,
      height: 2,
      title: 'Title 8',
      key: '8824214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/11.df00c4cb.jpg",
      width: 8,
      height: 5,
      title: 'Title 9',
      key: '9924214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/12.dd68c775.jpg",
      width: 3,
      height: 2,
      title: 'Title 1',
      key: '10124214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/13.7c0145a7.jpg",
      width: 3,
      height: 2,
      title: 'Title 2',
      key: '214124421'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/14.bd0230a4.jpg",
      width: 3,
      height: 2,
      title: 'Title 3',
      key: '412412412'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/15.82b405c5.jpg",
      width: 3,
      height: 2,
      title: 'Title 4',
      key: '4124124214'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/16.8656d7ac.jpg",
      width: 3,
      height: 2,
      title: 'Title 5',
      key: '1242134'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/17.1a403c78.jpg",
      width: 3,
      height: 2,
      title: 'Title 6',
      key: '125534'
    },
    {
      src: "https://about.phamvanlam.com/lazy-loading-image-demo/static/media/18.1b768b16.jpg",
      width: 16,
      height: 9,
      title: 'Title 7',
      key: '34235'
    },
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3,
      title: 'Title 1',
      key: '53253'
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1,
      title: 'Title 2',
      key: '324324'
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4,
      title: 'Title 3',
      key: '2341241'
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4,
      title: 'Title 4',
      key: '1241242'
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4,
      title: 'Title 5',
      key: '2352352'
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3,
      title: 'Title 6',
      key: '634621213'
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4,
      title: 'Title 7',
      key: '15432123'
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3,
      title: 'Title 8',
      key: '75653'
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3,
      title: 'Title 9',
      key: '1234653'
    },
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3,
      title: 'Title 1',
      key: '62345343'
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1,
      title: 'Title 2',
      key: '2325351'
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4,
      title: 'Title 3',
      key: '52352353'
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4,
      title: 'Title 4',
      key: '31423'
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4,
      title: 'Title 5',
      key: '523452'
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3,
      title: 'Title 6',
      key: '6348564'
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4,
      title: 'Title 7',
      key: '64563452'
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3,
      title: 'Title 8',
      key: '346345234'
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3,
      title: 'Title 9',
      key: '26876'
    }
];
export default lsPhotos