if(papaj3 === undefined) var papaj3 = {};
papaj3.name = 'papaj3';
papaj3.version = '1.2';
papaj3.GameVersion = '2.043';

papaj3.init = function(){ 
	{
		let dir = CCSE.GetModPath(papaj3.id);
		
		{CCSE.NewMilkSelection("harnold", [0,0,dir + "/harnold.png"], dir + "/piwo2.png");
		Game.Notify('<div style="text-align: center;font-weight: bold;color: #FFFFFF;">Papaj zaladowany</div>','<div style="text-align: center;font-weight: bold;color: #FF0000;">tancz z nami tancz</div>',[16,5,this.dir+'/icon.png'], 6, 1);
		Game.Loader.Replace('perfectCookie.png',this.dir+'/build02.png');
		Game.Loader.Replace('cursor.png',this.dir+'/build03.png');
		Music.addTrack('barka electro',this.dir+'/barka.mp3');
		PlayCue('fadeTo', CCSE.GetModPath(this.name) + '/snd/barka.mp3');
		papaj3.isLoaded = 1;}
	  }
    papaj3.CreateUpgrades();
	
	papaj3.reset();
	
	Game.customStatsMenu.push(function(){
		CCSE.AppendStatsVersionNumber(papaj3.name, papaj3.version);
	});
	
	Game.registerHook('reset', papaj3.reset);
	Game.registerHook('check', papaj3.check);
	Music.addTrack('harnas_ice',this.dir+'/harnas_ice_tea.mp3');
	Music.addTrack('barka electro',this.dir+'/barka.mp3');
	if (Game.prefs.popups) Game.Popup(papaj3.name + ' loaded!');
	else Game.Notify(papaj3.name + ' loaded!', '', '', 1, 1);
	papaj3.isLoaded = 1;
	}


	papaj3.load = function(str){
	console.log(str);
	var spl = str.split(',');
	papaj3.DecidedSong = parseInt(spl[0]||0);
}

papaj3.reset = function(hard){
	papaj3.DecidedSong = 0;
}

papaj3.check = function(){
	if (Game.Has('papaj3')) Game.Unlock('Song selector');
}


papaj3.AllSongs = [
	{name:'Automatic', icon:[ 0, 7]},
	{name:'C418 - hover', icon:[26, 17]},
	{name:'C418 - click', icon:[10, 0]},
	{name:'C418 - grandmapacolypse', icon:[15, 5]},
	{name:'C418 - ascend', icon:[21, 6]},
	{name:'harnas ice tea', icon:[25, 7],prereq:'Hot new single'},
	{name:'papaj - barka', icon:[30, 32]}
];

papaj3.CreateUpgrades = function(){
	if(!loc) var loc = (str)=>str;
	var order = Game.Upgrades["Background selector"].order + 1 / 1000;
	
	var upgrade = CCSE.NewUpgrade('Song selector', 'Lets you pick which song to play.', 0, [0, 0, CCSE.GetModPath(this.name)+'/icon.png']);
	upgrade.pool = 'toggle';
	upgrade.order = order;
	
	upgrade.descFunc = function(){
		var choice = papaj3.AllSongs[papaj3.DecidedSong];
		return '<div style="text-align:center;">' + 
			   loc("Current:") + ' ' + CCSE.MenuHelper.TinyIcon(choice.icon) + ' <b>' + choice.name + '</b>' + 
			   '</div><div class="line"></div>' + 
			   (this.ddesc?this.ddesc:this.desc)
	};
	
	upgrade.choicesFunction = function(){
		var choices = [];
		
		for (var i = 0; i < papaj3.AllSongs.length; i++){
			var temp = papaj3.AllSongs[i];
			
			if(!temp.prereq || Game.Has(temp.prereq)){
				choices[i] = {name:temp.name, icon:temp.icon};
				var neg = papaj3.AllSongs[i].negative?true:false;
				
				if(i == papaj3.DecidedSong){
					choices[i].selected = choices[i];
				}
			} else {
				choices[i] = 0;
			}
		}
		return choices;
	}
	
	upgrade.choicesPick = function(id){
		
		papaj3.DecidedSong = id
		papaj3.hideSelectorBox();
		if(id == 0) {
			Music.cue('play')
		} else if(id == 1) { 
			Music.loopTrack('preclick');
		} else if(id == 2) {
			Music.loopTrack('click');
		} else if(id == 3) {
			Music.loopTrack('grandmapocalypse');
		} else if(id == 4) {
			Music.loopTrack('ascend');
		} else if(id == 5) {
			Music.loopTrack('harnas_ice');
		} else if(id == 6) {
		  	Music.loopTrack('barka electro');
		}
	}
	
	CCSE.NewHeavenlyUpgrade('papaj3', loc("Odblokowuje <b>Song selector</b>, ktory pozwala wybrac utwor muzyczny."), 999, [0, 0, CCSE.GetModPath(this.name)+'/icon.png'], 316, 281, ['Basic wallpaper assortment']);
	CCSE.NewHeavenlyUpgrade('Hot new single', loc("Dodaje <b>Harnas Ice Tea</b> do gry. Po zakupie mozna wybrac utwor w Lukim."), 9999, [25,7], 478, 202, ['papaj3']);
	
	Game.upgradesToRebuild = 1;
}

papaj3.isNegative = function(){
	return papaj3.AllSongs[papaj3.DecidedSong].negative == 1;
}

papaj3.hideSelectorBox = function(){
	if(Game.choiceSelectorOn == Game.Upgrades["Song selector"].id) Game.Upgrades["Song selector"].buy();
}




papaj3.launch = function(){
	if(CCSE.ConfirmGameVersion(papaj3.name, papaj3.version, papaj3.GameVersion)) Game.registerMod(papaj3.name, papaj3);
}

if(!papaj3.isLoaded){
	if(CCSE && CCSE.isLoaded){
		papaj3.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(papaj3.launch);
	}
}