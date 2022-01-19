$(function() {
	init();
	console.log("Main Init Called");






});

function intItFilesRankBrd(){
	let index = 9;
	let file = FILES.FILE_A;
	let rank = RANKS.RANK_1;
	let sq = SQUARES.A1;

	for(index = 0; index < BRD_SQ_NUM; ++index){
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}

	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file, rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;
		}
	}
	console.log("FilesBRD[0]:" + FilesBrd[0] + " RanksBrd[0]:" + RanksBrd[0]);
	console.log("FilesBRD[SQUARES.A1]:" + FilesBrd[SQUARES.A1] + " RanksBrd[SQUARES.A1]:" + RanksBrd[SQUARES.A1]);
	console.log("FilesBRD[SQUARES.E8]:" + FilesBrd[SQUARES.E8] + " RanksBrd[SQUARES.E8]:" + RanksBrd[SQUARES.E8]);


}

function InitHashKeys(){
	let index = 0;

	for( index = 0; index < 14 * 120; ++index){
		PieceKeys[index] = RAND_32();
	}

	SideKey = RAND_32();

	for(index = 0; index < 16; ++index){
		CastleKeys[index] = RAND_32();
	}
}

function InitSq120to64(){
	let index = 0;
	let file = FILES.FILE_A;
	let rank = RANKS.RANK_1;
	let sq = SQUARES.A1;
	let sq64 = 0;

	for(index = 0; index < BRD_SQ_NUM; ++index){
		Sq120toSq64[index] = 65;
	}
	for(index = 0; index < 64; index++){
		Sq64ToSq120[index] = 120;
	}

	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
		for(file = FILES.FILE_A; file<= FILES.FILE_H; ++file){
			sq = FR2SQ(file, rank);
			Sq64ToSq120[sq64] = sq;
			Sq120toSq64[sq] = sq64;
			sq64++;
		}
	}



}


function init() {
	console.log("init() called");
	intItFilesRankBrd();
	InitHashKeys();

}