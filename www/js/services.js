angular.module('starter.services', [])

.factory('Feeds', function() {

  // criando um json com dados fakes para teste de feeds
  var feeds = [{
		id: 1,
		name: 'Uol',
		url: 'uol.com.br'
	}, {
		id: 2,
		name: 'Notícias 10',
		url: 'noticias10.net'
	}, {
		id: 3,
		name: 'Adoro Cinema',
		url: 'adorocinema.com.br'
	}];

	return {
		// retorna todos os feeds fake
    all: function() {
      return feeds;
		},
		// adiciona um feed
		add: function(feed) {
			var id = feeds.length + 1;
			var newFeed = {
				id: id,
				name: feed.name,
				url: feed.url
			}
			feeds.push(newFeed);
			console.log(feeds);
      return 'Adicionado com sucesso!';
		},
		// remove um ou vários feed
    remove: function(feedsId) {
			for(feedId of feedsId)
				feeds.splice(feeds.indexOf(feedId), 1);
			return 'Removido com sucesso!';
    }
  };
})

.factory('Posts', function() {

  // criando um json com dados fakes para teste de posts
  var posts = [{
		id: 1,
		idFeed: 1,
		title: 'Lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tellus mi, finibus in metus ut, gravida accumsan tortor. Quisque ac auctor orci. Aliquam ac elit nibh. Phasellus mollis ac mi sed euismod. Etiam risus dui, interdum dignissim vulputate vel, convallis suscipit risus. Etiam volutpat magna odio, eget porttitor ex ultricies vel. In gravida eros nec congue mollis. In id pellentesque nulla, non malesuada risus. Morbi facilisis volutpat libero, sit amet iaculis quam sollicitudin sit amet.',
		url: 'uol.com.br/post?lorem%20ipsum',
		read: false
	}, {
		id: 2,
		idFeed: 1,
		title: 'Proin auctor',
		text: 'Proin auctor mattis lorem, quis fringilla mi dapibus in. Donec vitae nulla ut quam suscipit molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam accumsan vestibulum diam sit amet luctus. Nam efficitur est id dolor fermentum, cursus laoreet sapien vestibulum. Vestibulum venenatis lacus dolor, non facilisis augue rutrum a. In lacinia cursus vestibulum. Etiam laoreet, purus sed suscipit euismod, sem nunc molestie orci, in rhoncus erat elit at turpis. Pellentesque accumsan elit ut tortor lobortis, id porta ante rhoncus. Sed hendrerit, lectus eget efficitur consequat, metus enim hendrerit sapien, eget venenatis nisi dui non libero.',
		url: 'uol.com.br/post?proin%20auctor',
		read: false
	}, {
		id: 3,
		idFeed: 1,
		title: 'Nullam egestas',
		text: 'Nullam egestas, erat quis finibus egestas, neque augue egestas mauris, eget pharetra dui tortor non sem. Quisque ac consequat nibh, eu varius metus. Proin vitae tristique lorem, a sagittis odio. Curabitur tristique massa malesuada, auctor erat ut, dictum quam. Mauris a nisl velit. Vestibulum aliquet fermentum malesuada. Donec magna dolor, varius eget nibh a, tempus feugiat nulla.',
		url: 'uol.com.br/post?nullam%20egestas',
		read: true
	}, {
		id: 4,
		idFeed: 2,
		title: 'Maecenas ligula',
		text: 'Maecenas ligula quam, feugiat ac neque at, lacinia ullamcorper orci. In fringilla volutpat mi, sit amet laoreet eros tincidunt sit amet. Pellentesque egestas nunc risus, tincidunt venenatis massa facilisis sit amet. Donec et eros lorem. Fusce eu quam quis dui lobortis viverra eget in neque. Nullam cursus lorem lacus, non ultricies nunc fermentum in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla mattis lobortis tortor nec rhoncus. Donec sed dapibus elit. Cras mattis aliquam bibendum.',
		url: 'noticias10.net/noticia?maecenas%20ligula',
		read: false
	}, {
		id: 5,
		idFeed: 2,
		title: 'Fusce venenatis',
		text: 'Fusce venenatis magna est, sed fermentum massa pharetra ut. Quisque vel diam sit amet eros aliquet rhoncus. Aenean non sagittis ante. Fusce auctor elit ut suscipit tempor. Nunc fermentum est arcu, facilisis hendrerit libero sodales in. Mauris quis turpis vulputate, pretium est et, congue ipsum. In condimentum blandit tincidunt. Etiam vestibulum nisl sit amet est scelerisque, in eleifend eros facilisis. Nunc est dui, finibus sit amet augue ut, finibus lobortis felis. Sed nulla velit, rutrum ac rutrum at, rutrum sodales leo.',
		url: 'noticias10.net/noticia?fusce%20venenatis',
		read: true
	}];

	return {
		// retorna todos os feeds fake
    all: function(feedId) {
			return posts.filter(post => post.idFeed == feedId);
		},
		// adiciona um feed
		read: function(postId) {
			for(post of posts) {
				if(post.id == postId) {
					if(!post.read) {
						post.read = true;
						return 'Post lido';
					}
				}
			}
		}
  };
});